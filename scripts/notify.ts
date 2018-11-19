import { IncomingWebhook } from "@slack/client";

interface PackageJson {
  name: string;
  version: string;
  repository?: {
    type?: string;
    url?: string;
  };
}

async function main() {
  const SLACK_WEBHOOK: string | undefined = process.env.SLACK_WEBHOOK;
  if (!SLACK_WEBHOOK) {
    return;
  }
  const pkg: PackageJson = await require("../package.json");
  const webhook = new IncomingWebhook(SLACK_WEBHOOK);
  const repositoryUrl = (pkg.repository && pkg.repository.url) || undefined;
  const npmRegistryUrl = `https://www.npmjs.com/package/${pkg.name}`;
  const message = repositoryUrl ? `${repositoryUrl}\n${npmRegistryUrl}` : npmRegistryUrl;
  webhook.send({
    attachments: [
      {
        title: `Information: ${pkg.name}`,
        title_link: `${repositoryUrl}/releases/tag/v${pkg.version}`,
        text: `🎉 New Release: v${pkg.version}`,
        color: "good",
        fields: [
          {
            title: "Github / npm Registry",
            value: message,
          },
        ],
      },
    ],
  });
}

(async () => main())();
