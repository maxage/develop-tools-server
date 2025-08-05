declare module 'shared' {
    interface BaiduRes {
        cards: {
            content: {
                isTop?: boolean
                word: string
                rawUrl: string
                desc?: string
                index: number
                hotScore?: number
            }[]
        }[]
    }

    interface BWapRes {
        code: number
        exp_str: string
        list: {
            hot_id: number
            keyword: string
            show_name: string
            score: number
            word_type: number
            goto_type: number
            goto_value: string
            icon: string
            live_id: any[]
            call_reason: number
            heat_layer: string
            pos: number
            id: number
            status: string
            name_type: string
            resource_id: number
            set_gray: number
            card_values: any[]
            heat_score: number
            stat_datas: {
                etime: string
                stime: string
                is_commercial: string
            }
        }[]
        top_list: any[]
        hotword_egg_info: string
        seid: string
        timestamp: number
        total_count: number
    }

    interface BHotVideoRes {
        code: number
        message: string
        ttl: number
        data: {
            list: {
                aid: number
                videos: number
                tid: number
                tname: string
                copyright: number
                pic: string
                title: string
                pubdate: number
                ctime: number
                desc: string
                state: number
                duration: number
                owner: {
                    mid: number
                    name: string
                    face: string
                }
                stat: {
                    view: number
                    danmaku: number
                    reply: number
                    favorite: number
                    coin: number
                    share: number
                    now_rank: number
                    his_rank: number
                    like: number
                    dislike: number
                }
                dynamic: string
                cid: number
                dimension: {
                    width: number
                    height: number
                    rotate: number
                }
                short_link: string
                short_link_v2: string
                bvid: string
                rcmd_reason: {
                    content: string
                    corner_mark: number
                }
            }[]
        }
    }

    interface ReferenceMessageRes {
        list: {
            data: {
                id: string
                title: string
                // 北京时间
                url: string
                publishTime: string
            }
        }[]
    }

    interface DouyinRes {
        data: {
            word_list: {
                sentence_id: string
                word: string
                event_time: string
                hot_value: string
                position: number
            }[]
        }
    }

    interface Jin10Item {
        id: string
        time: string
        type: number
        data: {
            pic?: string
            title?: string
            source?: string
            content?: string
            source_link?: string
            vip_title?: string
            lock?: boolean
            vip_level?: number
            vip_desc?: string
        }
        important: number
        tags: string[]
        channel: number[]
        remark: any[]
    }

    interface KaoPuRes {
        description: string
        link: string
        // Date
        pubDate: string
        publisher: string
        title: string
    }

    interface KuaishouRes {
        defaultClient: {
            ROOT_QUERY: {
                "visionHotRank({\"page\":\"home\"})": {
                    type: string
                    id: string
                    typename: string
                }
                [key: string]: any
            }
            [key: string]: any
        }
    }

    interface KuaishouHotRankData {
        result: number
        pcursor: string
        webPageArea: string
        items: {
            type: string
            generated: boolean
            id: string
            typename: string
        }[]
    }

    interface LinuxDoRes {
        topic_list: {
            can_create_topic: boolean
            more_topics_url: string
            per_page: number
            top_tags: string[]
            topics: {
                id: number
                title: string
                fancy_title: string
                posts_count: number
                reply_count: number
                highest_post_number: number
                image_url: null | string
                created_at: Date
                last_posted_at: Date
                bumped: boolean
                bumped_at: Date
                unseen: boolean
                pinned: boolean
                excerpt?: string
                visible: boolean
                closed: boolean
                archived: boolean
                like_count: number
                has_summary: boolean
                last_poster_username: string
                category_id: number
                pinned_globally: boolean
            }[]
        }
    }

    interface NowCoderRes {
        data: {
            result: {
                id: string
                title: string
                type: number
                uuid: string
                hotValueFromDolphin: number
            }[]
        }
    }

    interface ThepaperRes {
        data: {
            hotNews: {
                contId: string
                name: string
                pubTimeLong: string
            }[]
        }
    }

    interface TieBaRes {
        data: {
            bang_topic: {
                topic_list: {
                    topic_id: string
                    topic_name: string
                    create_time: number
                    topic_url: string

                }[]
            }
        }
    }

    interface TouTiaoRes {
        data: {
            ClusterIdStr: string
            Title: string
            HotValue: string
            Image: {
                url: string
            }
            LabelUri?: {
                url: string
            }
        }[]
    }

    interface V2exRes {
        version: string
        title: string
        description: string
        home_page_url: string
        feed_url: string
        icon: string
        favicon: string
        items: {
            url: string
            date_modified?: string
            content_html: string
            date_published: string
            title: string
            id: string
        }[]
    }

    interface WallStreetCnItem {
        uri: string
        id: number
        title?: string
        content_text: string
        content_short: string
        display_time: number
        type?: string
    }

    interface WallStreetCnLiveRes {
        data: {
            items: WallStreetCnItem[]
        }
    }

    interface WallStreetCnNewsRes {
        data: {
            items: {
                // ad
                resource_type?: string
                resource: WallStreetCnItem
            }[]
        }
    }

    interface WallStreetCnHotRes {
        data: {
            day_items: WallStreetCnItem[]
        }
    }

    interface WeiBoRes {
        ok: number // 1 is ok
        data: {
            realtime:
                {
                    num: number // 看上去是个 id
                    emoticon: string
                    icon?: string // 热，新 icon url
                    icon_width: number
                    icon_height: number
                    is_ad?: number // 1
                    note: string
                    small_icon_desc: string
                    icon_desc?: string // 如果是 荐 ,就是广告
                    topic_flag: number
                    icon_desc_color: string
                    flag: number
                    word_scheme: string
                    small_icon_desc_color: string
                    realpos: number
                    label_name: string
                    word: string // 热搜词
                    rank: number
                }[]
        }
    }

    interface StockRes {
        data: {
            items:
                {
                    code: string
                    name: string
                    percent: number
                    exchange: string
                    // 1
                    ad: number
                }[]

        }
    }

    interface ZhiHuRes {
        data: {
            id: number
            type: string
            style_type: string
            card_id: string
            attached_info: string
            feed_specific: {
                answer_count: number
            }
            card_label?: {
                icon: string
                night_icon: string
                type: string
            }
            target: {
                title_area: {
                    text: string
                }
                excerpt_area: {
                    text: string
                }
                image_area: {
                    url: string
                }
                metrics_area: {
                    text: string
                    font_color: string
                    background: string
                    weight: string
                }
                label_area?: {
                    type: string
                    trend: number
                    night_color: string
                    normal_color: string
                }
                link: {
                    url: string
                }
            }
        }[]
    }

    interface CoolapkRes {
        data: {
            id: string
            // 多行
            message: string
            // 起的标题
            editor_title: string
            url: string
            entityType: string
            pubDate: string
            // dayjs(dateline, 'X')
            dateline: number
            targetRow: {
                // 374.4万热度
                subTitle: string
            }
        }[]
    }

    interface ClsTelegramRes {
        title: string
        url: string
        brief: string
        content: string
        ctime: number
        pubDate: string
        share_img: string
        subjects?: any[]
        level: string
        id: number
    }

    interface JueJinRes {
        data: {
            content: [Object],
            content_counter: [Object],
            author: [Object],
            author_counter: [Object],
            user_interact: [Object]
        }[]
    }

    interface DouBanRes {
        data: {
            subject_collection_items: {
                card_subtitle: string
                title: string
                release_date: string
                url: string
                cover: {
                    url: string
                    width: number
                    height: number
                }
                pic: {
                    large: string
                    normal: string
                }
                rating: {
                    count: number
                    value: number
                }
                rank_value: number
                id: string
                related_search_terms?: {
                    name: string
                }[]
                comments: {
                    comment: string
                    user: {
                        name: string
                        avatar: string
                    }
                }[]
            }[]
        }
    }

    interface BaiduTeleplayRes {
        cards: {
            component: string
            content: {
                word: string
                rawUrl: string
                desc?: string
                index: number
                hotScore?: number
                url: string
                hotChange?: string
                show: Array<string>
                img: string
            }[]
        }[]
    }

    interface HuPuLOLRes {
        result: {
            components: {
                code: string
                data: {
                    matchInfo: {
                        businessType: string,
                        subMatchBusinessType: string,
                        matchId: string,
                        uniqueKey: string,
                        matchType: string,
                        matchStatus: 'INPROGRESS' | 'COMPLETED' | 'NOTSTARTED',
                        matchStatusDesc: string,
                        matchStartTimeStamp: string,
                        liveRoomLink: string,
                        againstInfo: {
                            memberInfos: {
                                "memberName": string,
                                "memberLogo": string,
                                "memberBaseScore": string,
                                "memberExtraScore": string,
                                "memberBigScore": string,
                                "memberId": string,
                                "memberType": string,
                                "memberDesc": string
                            }[], winnerMemberId: string
                        },
                        midGameStageInfo: { midGameStage: string, extraGameStageInfo: string },
                        lastReqTimeStamp: number,
                        matchName: string,
                        scoreCountText: string,
                        textStreamInfo: string,
                        recommendDesc: string,
                        itemId: string
                    }[]
                }
            }[]
        }
    }

    interface HuPuLoLScoreRes {
        data: {
            teamScoreInfo: {
                teamId: string
                home: boolean
                playerInfo: {
                    "playerId": number,
                    "playerName": string,
                    "playerScore": number,
                    "playerScoreNum": number,
                    "playerLocation": string,
                    "isSubstitution": boolean
                }[]
            }[]
        }
    }

    interface QQMusicRes {
        req_1: {
            data: {
                data: {
                    song: {
                        "rank": number,
                        "rankType": number,
                        "rankValue": string,
                        "recType": number,
                        "songId": number,
                        "vid": string,
                        "albumMid": string,
                        "title": string,
                        "singerName": string,
                        "singerMid": string,
                        "songType": number,
                        "uuidCnt": number,
                        "cover": string,
                        "mvid": number
                    }[]
                }
            }
        }
    }

    interface CSDNRes {
        data: {
            "www-info-list-new": {
                componentId: string
                info: {
                    list: {
                        "id": number,
                        "itemId": number,
                        "title": string,
                        "summary": string
                        "cover": string
                        "isTop": number,
                        "channel": number,
                        "editTime": string,
                        "viewCount": string,
                        "commentCount": string,
                        "diggCount": string,
                        "favoriteCount": string,
                        "publish": string,
                        "url": string,
                        "username": string,
                        "nickname": string,
                        "avatar": string,
                        "blogUrl": string,
                        "timestamp": 1753837036000
                    }[]
                }
            }
        }
    }

    interface SSPAIRes {
        data: {
            id: number,
            title: string
            banner: string,
            summary: string,
            comment_count: number,
            like_count: number,
            view_count: number,
            free: boolean,
            released_time: number,
            author: {
                nickname: string
            },
        }[]
    }

    interface JQKARes {
        data: {
            list: {
                id: number
                title: string
                digest: string
                url: string
                rtime: number
            }[]
        }
    }

    interface DongCheDiRes {
        props: {
            pageProps: {
                hotSearchList: {
                    gid: string
                    title: string
                    is_hot: number
                    score: number
                    description: string
                }[]
                staticData: {
                    news: {
                        title: string
                        publish_time: number
                        unique_id: number
                        unique_id_str: string
                        has_video: boolean
                        watch_or_read_count: number
                    }[]
                }
            }
        }
    }
}

