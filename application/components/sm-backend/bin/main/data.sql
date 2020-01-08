INSERT IGNORE INTO roles(name) VALUES('ROLE_ADMIN');
INSERT IGNORE INTO roles(name) VALUES('ROLE_USER');
INSERT IGNORE INTO users(created_at, updated_at, email,first_name, last_name, password, username) 
    VALUES('2020-01-03 13:22:28', '2020-01-03 13:22:28', 'admin@o2.pl','Basic', 
    'Admin', '$2a$10$Vj8Yl40sygctpNyM42LqqehlDV4NLpsOruotMrP9n1C08nTyMbOOy', 'admin');
INSERT IGNORE INTO user_roles(user_id, role_id) VALUES (1, 1);