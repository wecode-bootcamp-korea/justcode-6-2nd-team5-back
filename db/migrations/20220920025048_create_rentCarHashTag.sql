-- migrate:up
create table rentCarHashTag(
  id int primary key auto_increment not null,
  hashTag varchar(100) not null
);

-- migrate:down
drop table rentCarHashTag;
