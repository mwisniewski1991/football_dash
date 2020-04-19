import { elements, changeTeamName } from "./base";
import { Chart }  from 'chart.js'

//*********************************************************************************
//*********************************************************************************
//ADDINS
//DIFFRENT COLOR FOR NEGATIVE VALUE
const colorNegativeValue = (arr) => {
    
    const more = "rgba(32, 100, 17, .6)";
    const less = "rgba(134, 0, 0, .6)";
    const colorArr = [];

    //1. IF VALUE LESS THAN 0 THEN RED COLOR. GREATER GREEN.
    arr.forEach((el) => {
        if(el >= 0){
            colorArr.push(more)
        }
        else{
            colorArr.push(less)
        }
    });

    return colorArr
};


//*********************************************************************************
//*********************************************************************************
//CHART GOALS DIFFRENCES 
export const createChartGoalDiff = (chartData) =>{

    // console.log(chartData); //test

    const options =  {
        maintainAspectRatio: false,
        legend: {
           display: false},
        title: {
            display: false,
            text: "",
            fontColor: 'rgba(235, 95, 16, 1)'},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: '#000'
                },
                gridLines: {
                    color: 'rgba(255, 255, 255, .1)'
                },
            }],
            xAxes: [{
                ticks: {
                    fontSize: 12,
                    maxRotation: 15,
                    minRotation: 15,
                    autoSkip: false,
                    fontColor: '#000'
                },
                gridLines: {
                    color: 'rgba(255, 255, 255, .1)'
                }
            }]
        }
    };

    const data = {
        labels: chartData.teams.map(el => changeTeamName(el)), //change team name - replace 'AFC' and 'FC'
        datasets: [{
            label: 'Goals Diff',
            data: chartData.goalDifference,
            backgroundColor: colorNegativeValue(chartData.goalDifference),
            borderColor: '#000',
            borderWidth: 1
        }]
    };
    
    //CREATE CHART- IF EXIST UPDATE
    if(window.ChartGoalsDiff){
        window.ChartGoalsDiff.data.datasets[0].data = chartData.goalDifference;
        window.ChartGoalsDiff.data.datasets[0].backgroundColor = colorNegativeValue(chartData.goalDifference);
        window.ChartGoalsDiff.data.labels = chartData.teams.map(el => changeTeamName(el)); //change team name - replace 'AFC' and 'FC'
        window.ChartGoalsDiff.update();
    }
    else{
        const ctx = elements.chartGoalsDiffrences;

        window.ChartGoalsDiff = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
};

//RESET VALUE FOR INPUTS
export const resetInputValue = () => {
    elements.chartDiffButtonsLow.value = 1;
    elements.chartDiffButtonsHigh.value = 20;
};

//CREATE TITLE FOR CHART
export const chartGoalDiffTitle = (type) => {
    const string = `Goalf diffrence - ${type}`;
    elements.chartDiffTitle.textContent = string; 
};

export const changeInputMax = (max) =>{
    elements.chartDiffButtonsHigh.value = max;
    elements.chartDiffButtonsHigh.setAttribute('max', max);
};




//*********************************************************************************
//*********************************************************************************
//CHART GOLAS FOR/AGAINST
export const creatChartGoal = (chartData, type) => {
    // console.log(chartData);
    // console.log(type);


     //COLORS FOR CHARTS
     const color1 = "235, 95, 16"
     const color2 = "32, 100, 17"
     const color3 = "20, 62, 25"
     const bar1 = 1;
     const bar2 = 0.8;
     const bar3 = 0.6;
     const bar4 = 0.4;
     const bar5 = 0.2;
     const bar6 = 0.1;

    const options =  {
        maintainAspectRatio: false,
        title: {
            display: false,
            text: "",
            fontColor: 'rgba(235, 95, 16, 1)'},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: '#000'}, 
                gridLines: {
                    color: 'rgba(255, 255, 255, .1)'
                },
            }],
            xAxes: [{
                ticks: {
                    fontSize: 12,
                    maxRotation: 15,
                    minRotation: 15,
                    autoSkip: false,
                    fontColor: '#000'},
                gridLines: {
                    color: 'rgba(255, 255, 255, .1)'}
            }]
        }
    };

    const data = {
        labels: chartData.teams,
        datasets: [{
            label: `Total`,
            data: chartData.total,
            backgroundColor: `rgba(${color1}, ${bar1})`,
            borderColor: '#000',
            borderWidth: 1
        }, {
            label: `Home`,
            data: chartData.home,
            backgroundColor: `rgba(${color1}, ${bar3})`,
            borderColor: '#000',
            borderWidth: 1
        },{
            label: `Away`,
            data: chartData.away,
            backgroundColor: `rgba(${color1}, ${bar3})`,
            borderColor: '#000',
            borderWidth: 1
        }]
    };


    //chartGoalsForBest ; chartGoalsForWorts ; chartGoalsAgainstBest ; chartGoalsAgainstWorst
    

     //CREATE CHART- IF EXIST UPDATE

     if(window[`chart${type}`]){
        window[`chart${type}`].data.datasets[0].data = chartData.total;
        window[`chart${type}`].data.datasets[1].data = chartData.home;
        window[`chart${type}`].data.datasets[2].data = chartData.away;
        window[`chart${type}`].data.labels = chartData.teams.map(el => changeTeamName(el)); //change team name - replace 'AFC' and 'FC'
        window[`chart${type}`].update();
    }
    else{
        const ctx = elements[`chart${type}`];

        window[`chart${type}`] = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }

};

//RESET VALUE FOR SLIDERS
export const resetSlidervalue = () =>{
    Array.from(elements.chartsGoalsSlider).forEach(el=>{
        el.value = 10;  //value on input
        el.parentElement.parentElement.querySelector('.chartGoalsValue').textContent = 10; //value on span element
    });
};

