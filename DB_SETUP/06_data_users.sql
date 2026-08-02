use `The Heathens Store`;
-- $2a$10$ZL/qSSF2E9IGla40WRgNQu7jQ9upLcqs96qAi8GBsnpYSPgnCRnRG
insert into users(id,uuid,username,email,is_active,password_hash)
values
(1,UUID_TO_BIN('019da595-0a5e-7a97-8682-80e10caf05ef'),'admin','abc@gmail.com',true,'$2a$10$ZL/qSSF2E9IGla40WRgNQu7jQ9upLcqs96qAi8GBsnpYSPgnCRnRG'),
(2,UUID_TO_BIN('019da99e-dd5e-7ed0-ae1f-9bd593bed9a7'),'staff01','staff01@gmail.com',true,'$2a$10$eSdBgZQmwV5voV7A89zTcOuPTLbcPObmITRFM75fpWAiLG.GhHoY.'),
(3,UUID_TO_BIN('019da99e-dd5e-7ed0-ae1f-9bd593bed9a8'),'staff02','staff02@gmail.com',true,'$2a$10$eSdBgZQmwV5voV7A89zTcOuPTLbcPObmITRFM75fpWAiLG.GhHoY.'),
(4,uuid_to_bin('019da99e-dd5e-729e-bc7d-71350fb909cf'),'cus01','cus01@gmail',true,'$2a$10$eSdBgZQmwV5voV7A89zTcOuPTLbcPObmITRFM75fpWAiLG.GhHoY.'),
(5,uuid_to_bin('019da99e-dd5e-730e-80a6-73d144d21792'),'cus02','cus02@gmail.com',true,'$2a$10$uiZiU06.FlhOq/6b9bO6lu4jJik1L8A3haoJeMquCR9s3uHPMZbkm'),
(6,uuid_to_bin('019da99e-dd5e-7ba2-9b93-2534968811dc'),'cus03','cus03@gmail.com',true,'$2a$10$uiZiU06.FlhOq/6b9bO6lu4jJik1L8A3haoJeMquCR9s3uHPMZbkm');

insert into user_info(user_id,full_name,address)
values 
(1, 'Root Admin', 'This Company!'),
(2, 'Jarvis Droid', 'Z city'),
(3, 'Android Seven', 'Satan City'),
(4, 'Aris Thorne', 'Ironhold District, Cloud City 9'),
(5, 'Lyra Moonshadow', 'Silverlight Sanctum, Whispering Woods'),
(6, 'Kaelen Drake', 'Emberridge Outpost, Scorched Lands');

insert into admins(user_id) values (1);
insert into staffs(user_id,employee_code)
values 
(1,'a-0001'),
(2,'s-0001'),
(3,'s-0002');
