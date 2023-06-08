module.exports = (mongoose) => {
    const JackpotHistory = mongoose.model(
        "JackpotHistory",
        mongoose.Schema(
            {
                paidPlayer: {
                  type: String,
                  default: ""
                },
                amount: {
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
    return JackpotHistory;
};
