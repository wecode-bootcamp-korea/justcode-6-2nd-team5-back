-- migrate:up
create table lodgmentTag(
  id int primary key auto_increment not null,
  tag varchar not null
)

-- migrate:down
drop table lodgmentTag;
