-- migrate:up
create table lodgmentTag(
  id int primary key auto_increment not null,
  tag varchar(50) not null
)

-- migrate:down
drop table lodgmentTag;
