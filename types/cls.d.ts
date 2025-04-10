export interface Telegram {
  author_extends: AuthorExtends;
  assocFastFact: null;
  depth_extends: DepthExtends;
  deny_comment: number;
  level: Level;
  reading_num: number;
  content: string;
  in_roll: number;
  recommend: number;
  confirmed: number;
  jpush: number;
  img: string;
  user_id: number;
  is_top: number;
  brief: string;
  id: number;
  ctime: number;
  type: number;
  title: string;
  bold: number;
  sort_score: number;
  comment_num: number;
  modified_time: number;
  status: number;
  collection: number;
  has_img: number;
  category: string;
  shareurl: string;
  share_img: string;
  share_num: number;
  sub_titles: SubTitle[] | null;
  tags: any[];
  imgs: any[];
  images: any[];
  explain_num: number;
  stock_list: List[];
  is_ad: number;
  ad: Ad;
  subjects: Subject[] | null;
  audio_url: string[] | null;
  author: string;
  plate_list: List[];
  assocArticleUrl: string;
  assocVideoTitle: string;
  assocVideoUrl: string;
  assocCreditRating: any[];
  invest_calendar: InvestCalendar;
  share_content: string;
  gray_share: number;
  comment_recommand: null;
  timeline: null;
}

export interface Ad {
  id: number;
  title: string;
  img: string;
  url: string;
  monitorUrl: string;
  video_url: string;
  adTag: string;
  fullScreen: number;
  type: number;
}

export enum AuthorExtends {
  Empty = "",
}

export enum DepthExtends {
  DepthExtends = "",
  Empty = "[]",
  Null = "null",
}

export interface InvestCalendar {
  id: number;
  data_id: number;
  r_id: string;
  type: number;
  calendar_time: string;
  setting_time: string;
  event: null;
  economic: null;
  short_latents: null;
}

export enum Level {
  A = "A",
  B = "B",
  C = "C",
}

export interface List {
  rise_range_has_null: number | null;
  RiseRange: number;
  name: string;
  StockID: string;
  schema: string;
  status: string;
  last: number;
  is_stib: boolean;
}

export interface SubTitle {
  article_id: string;
  name: string;
  schema: string;
  external_link: string;
  img: string;
  ctime: number;
  author: string;
  brief: string;
  type: number;
  reading_num: number;
  level: string;
  channel: Channel;
}

export enum Channel {
  Cls = "cls",
  ClsStib = "cls,stib",
}

export interface Subject {
  article_id: number;
  subject_id: number;
  subject_name: string;
  subject_img: string;
  subject_description: string;
  category_id: number;
  attention_num: number;
  is_attention: boolean;
  is_reporter_subject: boolean;
  plate_id: number;
  channel: Channel;
}

export interface Params {
  app: string;
  os: string;
  sv: string;
  [key: string]: any;
}
