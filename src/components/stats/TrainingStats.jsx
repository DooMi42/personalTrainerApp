/**
 * TrainingStats component
 * Displays statistics about training sessions using bar chart visualization
 */
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const TrainingStats = ({ trainings }) => {
    /**
     * Group trainings by activity and calculate total minutes for each
     * Uses a Map to accumulate minutes per activity type
     */
    const activityMap = new Map();

    // Calculate total duration for each activity type
    trainings.forEach(training => {
        const activity = training.activity;
        const currentTotal = activityMap.get(activity) || 0;
        activityMap.set(activity, currentTotal + training.duration);
    });

    /**
     * Convert grouped map data to array format for Recharts
     * Each item has the format: { name: "Activity Name", minutes: totalMinutes }
     */
    const data = Array.from(activityMap).map(([name, minutes]) => ({
        name,
        minutes
    }));

    // Sort data by minutes in descending order (most popular activities first)
    data.sort((a, b) => b.minutes - a.minutes);

    /**
     * Define colors for chart bars
     * Each bar will get a different color from this array
     */
    const COLORS = [
        '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
        '#d0ed57', '#ffc658', '#ff8042', '#ff5252', '#c64292'
    ];

    return (
        <div className="stats-container">
            <h1>Training Statistics</h1>
            <h2>Minutes per Activity</h2>

            {/* Responsive chart container */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60 // Extra space for rotated X axis labels
                    }}
                >
                    {/* Grid lines for better readability */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X axis showing activity names */}
                    <XAxis
                        dataKey="name"
                        angle={-45} // Rotate labels for better fit
                        textAnchor="end"
                        height={70} // Space for rotated labels
                    />

                    {/* Y axis showing duration in minutes */}
                    <YAxis
                        label={{
                            value: 'Minutes',
                            angle: -90,
                            position: 'insideLeft'
                        }}
                    />

                    {/* Tooltip to show exact values on hover */}
                    <Tooltip
                        formatter={(value) => [`${value} minutes`, 'Duration']}
                    />

                    {/* Bar visualization of data with custom colors */}
                    <Bar dataKey="minutes" fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Summary statistics section */}
            <div className="stats-summary">
                <h3>Summary</h3>
                <p>Total activities: {data.length}</p>
                <p>
                    Total training time: {
                        data.reduce((total, item) => total + item.minutes, 0)
                    } minutes
                </p>
                {data.length > 0 && (
                    <p>
                        Most popular activity: {data[0].name} ({data[0].minutes} minutes)
                    </p>
                )}
            </div>
        </div>
    );
};

export default TrainingStats;