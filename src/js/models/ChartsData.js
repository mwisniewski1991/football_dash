
export default class chartData{
    constructor(data){
        this.data = data;
    }

    formatTableDataForChart = (data, type) => {

        //1. sort data
        data = sortBy(data, [g => g[type]]); //sort data by goalsDiff
    
        //2. object for new data
        let newData = {}; 
    
        //3. extract neccesery data
        const teams = data.map((el => {
            return el.team.name;
        }));
    
        const goalsDiff = data.map(el => {
            return el[type];
        });
    
        //4. put data into object
        newData.teams = teams.reverse(); //reverse - sortby in wrong way
        newData[type] = goalsDiff.reverse(); //reverse - sortby in wrong way
    
        this.dataChartDiff = newData
    };

    



}