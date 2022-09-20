-- migrate:up
create table lodgmentReviewPhoto(
  id int primary key auto_increment not null,
  lodgmentReviewId int not null,
  photo varchar,
  FOREIGN KEY (lodgmentReviewId) REFERENCES lodgmentReview(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table lodgmentReviewPhoto;
