'use client';
import CustomWidgetCard from "@/components/cards/custom-widget-card";
import { Button, Text } from "rizzui";
import { useEffect, useState } from "react";
import cn from "@/utils/class-names";

interface ProjectStatusProps {
    onViewPreSale: () => void;
}
const ProjectStatus: React.FC<ProjectStatusProps> = ({onViewPreSale  }) => {
    const [progress, setProgress] = useState<number>(32);
    const [countdown, setCountdown] = useState({
        hours: 2,
        minutes: 2,
        seconds: 2
    });
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 2);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({
                hours,
                minutes,
                seconds
            });

            if (distance < 0) {
                clearInterval(timer);
                setCountdown({ hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <CustomWidgetCard title='Presale Status'shadow='left' className="w-full">
            <div className="">
                <div className="flex items-center px-4 py-6 justify-between">
                    <div className="flex flex-col w-full items-center">
                        <Text className="text-xs font-medium text-greenPrimary-100 dark:text-greenPrimary-100">Stage</Text>
                        <Text className="text-sm font-medium text-greenPrimary-700 dark:text-white">Public Round 1</Text>
                      
                    </div>
                    <div className="flex flex-col w-full items-center">
                        <Text className="text-xs font-medium  text-greenPrimary-100 dark:text-greenPrimary-100">Progress</Text>
                        <div className="flex items-center">
                            <Text className="text-sm font-medium text-greenPrimary-700 dark:text-white">{progress}%</Text>
                        </div>
                    </div>
                </div>
                
                <div className="border-b border-white dark:border-greenPrimary-300 "></div>
                <div className=" p-6">
                <div className="flex flex-col mb-5  items-center">
                    <Text className="text-sm font-semibold text-greenPrimary-700 dark:text-white mb-3">
                        Countdown to Launch
                    </Text>
                    <div className="flex justify-center gap-4">
                        <CountdownBox value={countdown.hours} label="h" />
                        <CountdownBox value={countdown.minutes} label="m" />
                        <CountdownBox value={countdown.seconds} label="s" />
                    </div>
                </div>
                
                <div className="flex justify-center mb-2">
                    <Button 
                        className="!bg-yellow-primary w-full !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
                        onClick={onViewPreSale}
                    >
                        View Presale Details
                    </Button>
                </div>
                </div>
            </div>
        </CustomWidgetCard>
    );
}

const CountdownBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
        <div className={cn(
            "flex items-center gap-1 justify-center w-14 h-14 rounded-md bg-white dark:bg-greenPrimary-200",
            "text-sm font-medium text-gray-900 dark:text-white"
        )}>
            {value.toString().padStart(2, '0')}
            <Text className="text-sm font-medium text-gray-900 dark:text-white ">{label}</Text>
        </div>
    
    </div>
);

export default ProjectStatus;