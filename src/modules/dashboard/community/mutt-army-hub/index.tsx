import ProgressBar from "@/components/progress-bar/progress-bar";
import MuttArmy from "./mutt-army-form";

const MuttArmyPage = () => {
    const levelData = { level: 2, requiredCoins: 10000 };
    const coins = 1000;
    return (

        <>
            <ProgressBar coins={coins} levelData={levelData} />
            <MuttArmy/>

        </>
    )
}

export default MuttArmyPage