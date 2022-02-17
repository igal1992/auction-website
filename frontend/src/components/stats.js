
import RecentSells from './recentSells';
import TopFiveSells from './topFiveSells';
import TopUniqueSells from './topUniqueSells';

function Stats(props){
    return(
        <div className={props.className}>
           <TopFiveSells/>
           <TopUniqueSells/>
           <RecentSells/>
        </div>
    )
}
export default Stats;
