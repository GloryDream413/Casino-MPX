module.exports = (mongoose) => {
    const WeeklyResult = mongoose.model(
        "WeeklyResult",
        mongoose.Schema(
            {
                numberOfPlayers: {
                  type: Number,
                  default: 0
                },
                volumn: {
                    type: Number,
                    default: 0
                },
                chainId: {
                    type: String,
                    default: ""
                },
            },
            { timestamps: true }
        )
    );
    return WeeklyResult;
};
