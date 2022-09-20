-- migrate:up
create table lodgmentFacilityId(
  id int primary key auto_increment not null,
  lodgmentId int not null,
  facilityId int not null,
  FOREIGN KEY (facilityId) REFERENCES lodgmentFacility(id) ON UPDATE CASCADE DELETE CASCADE,
  FOREIGN KEY (lodgmentId) REFERENCES lodgment(id) ON UPDATE CASCADE DELETE CASCADE
);

-- migrate:down
drop table lodgmentFacilityId;
