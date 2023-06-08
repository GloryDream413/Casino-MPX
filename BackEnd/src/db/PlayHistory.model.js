module.exports = (mongoose) => {
    const PlayHistory = mongoose.model(
        "PlayHistory",
        mongoose.Schema(
            {
                player: {
                  type: String,
                  default: ""
                },
                chainId: {
                    type: String,
                    default: ""
                },
                depositAmount: {
                    type: Number,
                    default: 0
                },
                winOrLose: {
                   type: Boolean,
                   default: false
                },
                resultAmount: {
                    type: Number,
                    default: 0
                }
            },
            { timestamps: true }
        )
    );
    return PlayHistory;
};
