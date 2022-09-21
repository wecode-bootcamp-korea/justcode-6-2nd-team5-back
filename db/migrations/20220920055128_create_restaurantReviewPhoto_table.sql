-- migrate:up
create table restaurantReviewPhoto(
  id int primary key auto_increment not null,
  restaurantReviewId int not null,
  photo varchar(3000),
  FOREIGN KEY (restaurantReviewId) REFERENCES restaurantReview(id) ON DELETE CASCADE UPDATE CASCADE
)

-- migrate:down
drop table restaurantReviewPhoto;
