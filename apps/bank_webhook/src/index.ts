import prisma from "@repo/db/client";
import express from "express";
const PORT = 3002;
const app = express();
app.use(express.json());

// bank hits this webhook to update the balance of user
app.post('/HDFCBank', async (req: any, res: any) => {
    // TODO: Add zod validation here?
    // TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    // data from bank
    const data = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }

    // implement database transaction 
    // to update balance and update onramptransactions
    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: data.userId
                },
                data: {
                    amount: {
                        increment: Number(data.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: data.token
                },
                data: {
                    status: "Success",
                }
            })
        ])

        return res.json({
            msg: "Captured"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(408).json({
            msg: "Failure"
        })
    }
})


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})

// add balances
// add OnRampTransactions
// using the data sent by bank
