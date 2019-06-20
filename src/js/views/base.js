export const elements = {
    select : document.querySelector(".select"),
    selectDashButton : document.querySelector(".select__button"),
    scorersTable : document.querySelector('#body-scorers-table'),
    leagueTable: document.querySelector('#body-league-table'),
    leagueTableTitle: document.querySelector('#leagueTitle'),
    tableButtons: document.querySelectorAll('.select__link--type'), 
    tableButtonTotal: document.querySelector('.select__link--type--1'),
    tableButtonHome: document.querySelector('.select__link--type--2'),
    tableButtonAway: document.querySelector('.select__link--type--3'),
    selectButtons: document.querySelectorAll('.select__link--league'),
    chartGoalsDiffrences: document.querySelector('#chartGoalsDiff'),
    chartgoalsForBest: document.querySelector('#chartGoalsForBest'),
    chartgoalsForWorst: document.querySelector('#chartGoalsForWorst'),
    chartgoalsAgainstBest: document.querySelector('#chartGoalsAgainstBest'),
    chartgoalsAgainstWorst: document.querySelector('#chartGoalsAgainstWorst'),
    chartDiffButtons: document.querySelectorAll('.chartDiff-settings__value'),
    chartDiffButtonsLow: document.querySelector('.chartDiff-settings__value--low'),
    chartDiffButtonsHigh: document.querySelector('.chartDiff-settings__value--high'),
    chartDiffTitle: document.querySelector('.goalDiffTitle'),
    chartsGoalsSlider: document.querySelectorAll('.chartGoals-box__value')
};

export const changeTeamName = (name) => {

    const listFind = ['AFC', 'FC', 'Wolverhampton Wanderers', 'Brighton & Hove Albion', 'Tottenham Hotspur', 'CF']; //list of word to replace
    const listReplace  = ['', '', 'Wolverhampton', 'Brigthon', 'Tottenham', '']; //what put instead of it

    let newName = name;
    listFind.forEach((el, i) => {
        newName = newName.replace(el, listReplace[i]);
    })

    return newName;
} ;