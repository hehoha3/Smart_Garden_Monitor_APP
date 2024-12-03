import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"

interface TimePickerProps {
    title: string;
    initialTimeOn: string;
    initialTimeOff: string;
    onTimeSet: any;
}

export default function TimePicker({ title, initialTimeOn, initialTimeOff, onTimeSet }: TimePickerProps) {
    const [timeOn, setTimeOn] = useState(new Date());
    const [timeOff, setTimeOff] = useState(new Date());

    const [formattedTimeOn, setFormattedTimeOn] = useState('');
    const [formattedTimeOff, setFormattedTimeOff] = useState('');

    const [showSetTimeOn, setShowSetTimeOn] = useState(false);
    const [showSetTimeOff, setShowSetTimeOff] = useState(false);

    useEffect(() => {
        if (initialTimeOn) {
            const [hours, minutes] = initialTimeOn.split(':');
            const time = new Date();
            time.setHours(parseInt(hours), parseInt(minutes));
            setTimeOn(time);
            setFormattedTimeOn(initialTimeOn);
        }

        if (initialTimeOff) {
            const [hours, minutes] = initialTimeOff.split(':');
            const time = new Date();
            time.setHours(parseInt(hours), parseInt(minutes));
            setTimeOff(time);
            setFormattedTimeOff(initialTimeOff);
        }
    }, [initialTimeOn, initialTimeOff]);

    // Format time to HH:MM
    const formatTime = (time: Date) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    //! Set Time_ON
    const onChangeTimeOn = (e: DateTimePickerEvent, selectedTime?: Date) => {
        if (e.type === 'set' && selectedTime) {
            setTimeOn(selectedTime);
            setFormattedTimeOn(formatTime(selectedTime));
            setShowSetTimeOff(true); // auto open SET TIME OFF
        }
        setShowSetTimeOn(false);
    }

    const showModeOn = () => {
        setShowSetTimeOn(true);
    }

    //! Set Time_OFF
    const onChangeTimeOff = (e: DateTimePickerEvent, selectedTime?: Date) => {
        if (e.type === 'set' && selectedTime) {
            // Check the difference of time on and time off
            const newOffTime = selectedTime;
            const timeDifference = (newOffTime.getTime() - timeOn.getTime()) / (1000 * 60 * 60);

            if (timeDifference > 2 || timeDifference <= 0) {
                Alert.alert(
                    '!!! Cảnh báo !!!',
                    'Bạn đã đặt thời gian sử dụng quá lâu cho thiết bị, Hãy đặt lại nó !',
                    [{
                        text: 'OK', onPress: () => {
                            setShowSetTimeOff(false);
                            setTimeout(() => {
                                setShowSetTimeOff(true);
                            }, 100);
                        }
                    }]
                )
            } else {
                setTimeOff(selectedTime);
                setFormattedTimeOff(formatTime(selectedTime));

                onTimeSet(formattedTimeOn, formatTime(selectedTime));  // Send time data to Firebase
                setShowSetTimeOff(false);
            }
        } else if (e.type === 'dismissed') {
            Alert.alert(
                '!!! Cảnh báo !!!',
                'Bạn cần phải đặt thời gian tắt cho thiết bị !',
                [{
                    text: 'OK', onPress: () => {
                        setShowSetTimeOff(false);
                        setTimeout(() => {
                            setShowSetTimeOff(true);
                        }, 100);
                    }
                }]
            )
        }
    }

    //! Clear both times
    const clearTimes = () => {
        setFormattedTimeOn('');
        setFormattedTimeOff('');
        onTimeSet('', '');
    };


    //! -------------------------------------- RETURN --------------------------------------
    return (
        <View className='flex-row justify-start items-center min-h-[35px] mb-5'>
            {/* TITLE */}
            <Text className='min-w-[105px] text-white font-bold text-xl'>{title} timer</Text>
            <Text className='text-white font-bold text-xl mr-2'>:</Text>


            {/* ON TIME */}
            <View className='flex-row justify-start items-center mr-1'>
                <Text className='text-white'>On Time: </Text>
                {formattedTimeOn ?
                    <Text className='text-white'>{formattedTimeOn} |</Text> :
                    <TouchableOpacity activeOpacity={0.7} className='bg-blue-700 p-1 rounded-lg justify-center items-center' onPress={showModeOn}>
                        <Text className='text-white'>Not Set</Text>
                    </TouchableOpacity>
                }
            </View>
            {showSetTimeOn && (
                <DateTimePicker value={timeOn} mode='time' is24Hour={true} onChange={onChangeTimeOn} />
            )}


            {/* OFF TIME */}
            <View className='flex-row justify-start items-center mr-2'>
                <Text className='text-white'>Off Time: </Text>
                {formattedTimeOff ?
                    <Text className='text-white'>{formattedTimeOff}</Text> :
                    <TouchableOpacity activeOpacity={0.7} className='bg-blue-700 p-1 rounded-lg justify-center items-center' onPress={showModeOn}>
                        <Text className='text-white'>Not Set</Text>
                    </TouchableOpacity>
                }
            </View>
            {showSetTimeOff && (
                <DateTimePicker value={timeOff} mode='time' is24Hour={true} onChange={onChangeTimeOff} />
            )}


            {/* CLEAR BUTTON */}

            {(formattedTimeOn && formattedTimeOff) && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    className='bg-red-700 py-2 px-3 rounded-lg'
                    onPress={clearTimes}
                >
                    <Text className='text-white'>Clear</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}