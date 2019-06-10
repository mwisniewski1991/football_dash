import axios from 'axios';
import {key, proxy} from '../config';


export default class League{
    constructor(idLeague){
        this.idLeague = idLeague;
    }

    async getTables(){
        try{
            const res = await axios({
                method: 'get',
                url: `${proxy}http://api.football-data.org/v2/competitions/${this.idLeague}/standings`,
                headers: {'X-Auth-Token': key}
            });

            // this.results = res
            // console.log(this.results);

            this.currentComp = res.data.competition.name;
            this.tableTotal = res.data.standings[0].table; //total
            this.tableHome = res.data.standings[1].table;  //home
            this.tableAway = res.data.standings[2].table;  //away

        }
        catch(error){
            alert(error);
        }
    }

    async getScorers(){
        try{
            const res = await axios({
                method: 'get',
                url: `${proxy}http://api.football-data.org/v2/competitions/${this.idLeague}/scorers`,
                headers: {'X-Auth-Token': key}
            });

            // console.log(res);
            this.scorers = res.data.scorers;
        }
        catch(error){
            alert(error);
        }
    }
};