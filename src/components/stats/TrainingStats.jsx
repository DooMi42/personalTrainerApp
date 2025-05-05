import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const TrainingStats = ({ trainings }) => {
    // Group trainings by activity and sum durations
    const activityMap = new Map();

    trainings.forEach(training => {
        const activity = training.activity;
        const currentTotal = activityMap.get(activity) || 0;
        activityMap.set(activity, currentTotal + training.duration);
    });

    // Convert to array for Recharts
    const data = Array.from(activityMap).map(([name, minutes]) => ({
        name,
        minutes
    }));

    // Sort data by minutes (descending)
    data.sort((a, b) => b.minutes - a.minutes);

    // Generate colors - one for each bar
    const COLORS = [
        '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
        '#d0ed57', '#ffc658', '#ff8042', '#ff5252', '#c64292'
    ];

    return (
        <div className="stats-container">
            <h1>Training Statistics</h1>
            <h2>Minutes per Activity</h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                    />
                    <YAxis
                        label={{
                            value: 'Minutes',
                            angle: -90,
                            position: 'insideLeft'
                        }}
                    />
                    <Tooltip
                        formatter={(value) => [`${value} minutes`, 'Duration']}
                    />
                    <Bar dataKey="minutes" fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

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