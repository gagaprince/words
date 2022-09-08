create table words.lesson
(
    id         bigint auto_increment
        primary key,
    book_name  varchar(100)  not null,
    level_name varchar(100)  null,
    unit_name  varchar(100)  null,
    ctime      bigint        null,
    utime      bigint        null,
    words      varchar(2048) null comment '包含的单词 逗号分隔'
);

