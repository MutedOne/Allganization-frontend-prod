export interface ViewId {
  id: number;
}

export const defaultId = (): ViewId => ({
  id: 0,
});

export interface Message {
  message: string;
}

export const defaultMessage = (): Message => ({
  message: '',
});
