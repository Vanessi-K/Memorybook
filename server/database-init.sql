SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Image;
DROP TABLE IF EXISTS OwnsBook;
DROP TABLE IF EXISTS Grouping;
DROP TABLE IF EXISTS Memorybook;
DROP TABLE IF EXISTS SaveElement;
DROP TABLE IF EXISTS User;

SET foreign_key_checks = 1;

CREATE TABLE User(userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                   username TINYTEXT NOT NULL,
                   email TINYTEXT NOT NULL,
                   profilePicture MEDIUMTEXT NOT NULL,
                   password TINYTEXT NOT NULL);

CREATE TABLE SaveElement(elementId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         title TINYTEXT NOT NULL,
                         description MEDIUMTEXT NOT NULL);

CREATE TABLE Memorybook(memorybookId INT NOT NULL PRIMARY KEY,
                        isFavourite BOOLEAN DEFAULT false,
                        startDate DATE NOT NULL,
                        endDate DATE,
                        creationDate DATE,
                        creator INT NOT NULL,
                        FOREIGN KEY(memorybookId) REFERENCES SaveElement(elementId) ON DELETE CASCADE ON UPDATE CASCADE ,
                        FOREIGN KEY(creator) REFERENCES User(userId) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE Grouping(groupId INT NOT NULL PRIMARY KEY,
                      memorybookId INT NOT NULL,
                      orderNUmber INT,
                      FOREIGN KEY(groupId) REFERENCES SaveElement(elementId)  ON DELETE CASCADE ON UPDATE CASCADE,
                      FOREIGN KEY(memorybookId) REFERENCES Memorybook(memorybookId)  ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE OwnsBook(userId INT NOT NULL,
                      memorybookId INT NOT NULL,
                      canEdit BOOLEAN DEFAULT false,
                      FOREIGN KEY(userId) REFERENCES User(userId) ON DELETE CASCADE ON UPDATE CASCADE,
                      FOREIGN KEY(memorybookId) REFERENCES Memorybook(memorybookId)  ON DELETE CASCADE ON UPDATE CASCADE,
                      PRIMARY KEY (userId, memorybookId));

CREATE TABLE Image(imageId INT NOT NULL PRIMARY KEY,
                   elementId INT NOT NULL,
                   canEdit BOOLEAN DEFAULT false,
                   path MEDIUMTEXT NOT NULL,
                   description MEDIUMTEXT,
                   FOREIGN KEY(elementId) REFERENCES SaveElement(elementId)  ON DELETE CASCADE ON UPDATE CASCADE);
