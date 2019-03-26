export interface State {
  size: {
    width: number;
    height: number;
  };
}

export const initialState: State = {
  size: { width: NaN, height: NaN },
};
