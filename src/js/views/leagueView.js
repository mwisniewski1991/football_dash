import { elements, changeTeamName } from "./base";


//TABLE PART
const renderTable = (el) => {

    const markup = `
            <tr>
                <td>${el.position}</td> 
                <td>${changeTeamName(el.team.name)}</td>
                <td>${el.playedGames}</td>
                <td>${el.won}</td>
                <td>${el.draw}</td>
                <td>${el.lost}</td>
                <td>${el.goalsFor}</td>
                <td>${el.goalsAgainst}</td>
                <td>${el.goalDifference}</td>
                <td>${el.points}</td>
            </tr>
        `;

    elements.leagueTable.insertAdjacentHTML('beforeend', markup);
};

export const createTable = (table) => {
    // console.log(table); //testing
    table.forEach(el => renderTable(el));
};

export const clearTable = () =>{
    elements.leagueTable.innerHTML = '';
};

export const createLeagueTitle = (leagueName) => {
    elements.leagueTableTitle.textContent = leagueName;
};


//SCORERS PART
const renderScorers = (el) => {
    const markup = `
        <tr>
            <td>${el.player.name}</td>
            <td>${el.team.name}</td>
            <td>${el.numberOfGoals}</td>
        </tr>
    `;

    elements.scorersTable.insertAdjacentHTML('beforeend', markup);
};

export const createScorers = (scorersList) => {
    // console.log(scorersList); //testing
    scorersList.forEach(el => renderScorers(el))
};

export const clearScorers = () =>{
    elements.scorersTable.innerHTML = '';
};


