
import CategoryChart from "./CategoryChart";

interface SummaryProps {
    totalSpent: number;
    categorySummary: Record<string, number>;

}
function Summary({ totalSpent, categorySummary }: SummaryProps) {
    return (
        <div 
            className="summary"
            
            >
                <h2 style={{ margin: '0 0 8px 0'}}>Summary</h2>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0'}}>
                    Total spent: ${totalSpent.toFixed(2)}
                </p>
                <CategoryChart categorySummary={categorySummary} />
            </div>
    )
}
export default Summary;