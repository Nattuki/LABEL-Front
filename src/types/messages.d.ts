export type Message = {
  messageId: string;
  creatorName: string;
  title: string;
  comment: string;
  url: string;
  urlType: UrlType;
  createdOn: string;
};

export type Label = {
  labelId: string;
  messageId: string;
  content: string;
  labelColor: string;
  jumpTime: number;
  creatorName: string;
  createdOn: string;
};

export type UrlType = "YouTube" | "Spotify";
