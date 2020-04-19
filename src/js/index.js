import '../sass/main.scss'; //IMPORT SASS
import League from './models/League';
import * as leagueView from './views/leagueView';
import * as chartsView from './views/chartsView';
import * as chartsData from './views/chartsData';
import * as buttonEvent from './views/buttonEvent';
import {elements} from './views/base';


//GLOBAL STATE OF THE APP
//currentComp, tableTotal, tableHome, tableAway, scorers
const state = {};

//*********************************************************************************
//*********************************************************************************
//API CONTROLLER
const controlSearch = async (e) => {

    //1. GET ID LEAGUE - ON LOAD 2021 - PREMIER LEAGUE
    let leagueId;
    const selectButtons = elements.selectButtons;

    //set up league id
    if (e) {
        //if choose the same league as current do not use api data again
        if (e.target.id === state.league.idLeague){
            return;
        }
        else{
            leagueId = e.target.id;
        }
    } else {
        leagueId = '2014'
    }

    //2. NEW SEARCH OBJECT ADD TO STATE
    // console.log(leagueId);

    state.league = new League(leagueId);
    // state.league = new League('2021');

    //change current type in state - default 'Total'
    state.league.currentType = 'Total';


    try {
        //3. SEARCH FOR LEAGUE
        await state.league.getTables();
        await state.league.getScorers();
        state.league.getCurrentType(); //set up current league type

        //test
        // await state.league.getTeam();

        //4. PREPARE UI FOR INPUT
        leagueView.clearTable();
        leagueView.clearScorers();
        leagueView.defaultTypeButtons();
        leagueView.selectLeagueButton(leagueId);


        //5. RENDER TABLE
        leagueView.createLeagueTitle(state.league.currentComp);
        leagueView.createTable(state.league.tableTotal); //league table
        leagueView.createScorers(state.league.scorers); //scorers table

        //6. RENDER CHARTS
        //a. GOAL DIFF
        //reset input to default value
        chartsView.resetInputValue();

        //goals diffrences
        const chartGoalDiffData = chartsData.formatTableDataForChart(state.league.tableTotal); //create data
        chartsView.createChartGoalDiff(chartGoalDiffData); //render chart
        chartsView.changeInputMax(chartGoalDiffData.teams.length) //set-up input value - max equal number os teams

        //change chary diff title
        chartsView.chartGoalDiffTitle(state.league.currentType);

        //b. GOALS FOR/AGAINST
        //reset input to default value
        // chartsView.resetSlidervalue();

        // {
        //     //create data chart
        //     const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsForBest", 1, 10);
        //     // console.log(chartGoalData);
        //     //render chart
        //     chartsView.creatChartGoal(chartGoalData, "goalsForBest");
        // }
        // {
        //     const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsForWorst");
        //     // console.log(chartGoalData);
        //     chartsView.creatChartGoal(chartGoalData, "goalsForWorst");
        // }
        // {
        //     const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsAgainstBest");
        //     // console.log(chartGoalData);
        //     chartsView.creatChartGoal(chartGoalData, "goalsAgainstBest");
        // }
        // {
        //     const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, "goalsAgainstWorst");
        //     // console.log(chartGoalData);
        //     chartsView.creatChartGoal(chartGoalData, "goalsAgainstWorst");
        // }

    } catch (error) {
        console.log(error);
    }
};

//CHANGE LEGAUE TABLE TOTAL/HOME/AWAY
const changeLeagueKind = (e) => {

    //1. remove clicked class from whole elements
    const buttons = Array.from(elements.tableButtons);
    buttons.forEach(el => {
        el.classList.remove('select__link--clicked');
    });

    //2. add class to clicked element
    event.target.classList.add('select__link--clicked');

    //3.clear table from UI
    leagueView.clearTable();

    //4. render new table and udpate chart
    let type = e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1) //change first letter to uppercase. necessery for next step
    //set up current league type
    state.league.getCurrentType(type);

    //create league table
    leagueView.createTable(state.league[`table${state.league.currentType}`]);

    //get value from input to update chart
    let start = elements.chartDiffButtonsLow.value;
    let end = elements.chartDiffButtonsHigh.value;

    //create golas diff chart
    let chartGoalDiffData = chartsData.formatTableDataForChart(state.league[`table${state.league.currentType}`], start, end);
    chartsView.createChartGoalDiff(chartGoalDiffData);
    //change chary diff title
    chartsView.chartGoalDiffTitle(state.league.currentType);
};

//*********************************************************************************
//*********************************************************************************
//CHANGE CHART DIFF BASE ON INPUT VALUE
const chartDiffUpdate = () => {

    //1. GET VALUE FROM INPUTS 
    let start = elements.chartDiffButtonsLow.value;
    let end = elements.chartDiffButtonsHigh.value;

    //2. CHECK WHAT IS CURRENT LEAGUE TYPE
    // console.log(`START: ${start} END: ${end}`);
    const type = state.league.currentType;

    //3. FORMAT DATA AND RENDER CAHRT
    const chartGoalDiffData = chartsData.formatTableDataForChart(state.league[`table${type}`], start, end);
    chartsView.createChartGoalDiff(chartGoalDiffData);   
};



//*********************************************************************************
//*********************************************************************************
//CHANGE CHART GOALS BASE ON SLIDER VALUE
const chartGoalsUpdate = (e) =>{

    //1. GET VALUE FOR TYPE OF CHARTS WHICH WE WANT TO CHANGE AND VALUE FROM SLIDER
    const type = e.target.id;
    const value = e.target.value;

    //2.PUT DATAE TO DATA FUNCTION
    const chartGoalData = chartsData.formatDataForChartForAgainst(state.league, type, 1, value);
    
    //3.UDATE SPAN ELEMENT - NUMBERS OF TEAMS
    //find two parents of elements and then find span element
    e.target.parentElement.parentElement.querySelector('.chartGoalsValue').textContent = value;

    //4.UPDATE CHART
    chartsView.creatChartGoal(chartGoalData, type);

};


//SHOW/HIDE CHART GOALS
const showHideChartGoals = () => {
    

};


//*********************************************************************************
//*********************************************************************************
//LISTENERS --------------------------------------------------------------LISTENERS

//LISTENER TO CHANGE LEAGUE
Array.from(elements.selectButtons).forEach(el => {
    el.addEventListener('click', controlSearch);
});

//LISTENER TO CHANGE LEGAUE TABLE TOTAL/HOME/AWAY
Array.from(elements.tableButtons).forEach(el => {
    el.addEventListener('click', changeLeagueKind);
});

//LISTENER TO CHART DIFF INPUT
Array.from(elements.chartDiffButtons).forEach(el => {
    el.addEventListener('change', chartDiffUpdate)
});

//LISTENER TO CHART GOALS RANGE SLIDER
Array.from(elements.chartsGoalsSlider).forEach(el =>{
    el.addEventListener('change', chartGoalsUpdate);
});

//LISTENER TO DASH BUTTON
elements.selectDashButton.addEventListener("click", buttonEvent.moveDashControll);

//*********************************************************************************
//********************************************************************************
//START ON LOAD
controlSearch();
console.log(state); //test