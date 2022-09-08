create table words.words_en
(
    id         bigint auto_increment
        primary key,
    word       varchar(50)   null,
    word_zn    varchar(100)  null comment '中文',
    yinbiao    varchar(100)  null comment '音标',
    voice      varchar(200)  null comment '读音链接',
    pic        varchar(200)  null comment '样例图片',
    sentence   varchar(512)  null comment '例句',
    video      varchar(200)  null comment '视频链接',
    captions   varchar(1024) null comment '字幕',
    multi_mean varchar(1024) null comment '更多词义',
    cixing     varchar(50)   null comment '主词性',
    ctime      bigint        null,
    utime      bigint        null
);

create index words_en_word_index
    on words.words_en (word);

