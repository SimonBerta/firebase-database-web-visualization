clear all
dq = daq("ni"); % read NI card with Data Acquisition Toolbox
dq.Rate = 1000; % measurement frequency 1 kHz
sec = 2; % length of measurement in seconds
ch1 = addinput(dq,"Dev4", "ai0","Voltage"); % define channel 1 of measurement
ch2 = addinput(dq,"Dev4", "ai1","Voltage"); % define channel 2 of measurement
data = read(dq, seconds(sec)); % read data points for 2 seconds

date = datestr(floor(now),'dd-mm-yyyy'); % get current date
time = datestr(rem(now,1),'HH:MM:SS'); % get current time
date_var={struct('date', date); struct('time',time)}; % make structure from date and time values

t=0:1/dq.Rate:sec-1/dq.Rate; % create time vector with step 1/dq.Rate

x=t';
y=data.Dev4_ai0;
json_data_0 = jsonencode({date_var,table(x,y)}); % encode data for channel AI0 to appropriate JSON format
x=t';
y=data.Dev4_ai1;
json_data_1 = jsonencode({date_var,table(x,y)}); % encode data for channel AI1 to appropriate JSON format

Firebase_Url_0 = 'https://tom-database-1c231-default-rtdb.europe-west1.firebasedatabase.app/ai0.json'; % url for channel AI0 in database - direct JSON write 
response_0 = webwrite(Firebase_Url_0, json_data_0); % write data to database for AI0 channel
Firebase_Url_1 = 'https://tom-database-1c231-default-rtdb.europe-west1.firebasedatabase.app/ai1.json'; % url for channel AI1 in database - direct JSON write
response_1 = webwrite(Firebase_Url_1, json_data_1); % write data to database for AI1 channel
