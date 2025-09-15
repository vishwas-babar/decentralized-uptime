import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History, ExternalLink, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface RewardTransaction {
  id: string;
  dateTime: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  txHash: string;
}

const mockTransactions: RewardTransaction[] = [
  {
    id: "1",
    dateTime: "2024-09-13 14:30:25",
    amount: 0.5,
    status: "completed",
    txHash: "5J4Kq9ot9nEQWMDWWhpZLkHtfNEtBBe8Y6hV4rTuB8FGp3cD2sX9mK1wQz7RyNvL",
  },
  {
    id: "2",
    dateTime: "2024-09-12 09:15:42",
    amount: 1.2,
    status: "completed",
    txHash: "8R7Vm2pY3kLs5XcW9TfHg6NqB1uE4mJrD8oZ7yA2vC5wQ1xS3nK9mL4tP6rY8uI",
  },
  {
    id: "3",
    dateTime: "2024-09-11 16:45:18",
    amount: 0.8,
    status: "pending",
    txHash: "3F9Hx7wN2qR5bY1zK4sL8pM6tA9cV7dE2wQ5rT8yU3iO1nP4mX6zA8bC7vF2gH",
  },
  {
    id: "4",
    dateTime: "2024-09-10 11:22:07",
    amount: 2.5,
    status: "completed",
    txHash: "7K3Lm8pQ2wR9tY5uI1oP4sA6dF8gH3jK7nM2xC5vB9zE4qW1tY6rU8iO3pS7mL",
  },
  {
    id: "5",
    dateTime: "2024-09-09 20:18:33",
    amount: 0.3,
    status: "failed",
    txHash: "9M5Np2qW4rT7yU8iO1pS6aD3fG7hJ2kL5nM8xC2vB4zE1qW6tY9rU3iO7pS4mL",
  },
  {
    id: "6",
    dateTime: "2024-09-08 13:55:19",
    amount: 1.8,
    status: "completed",
    txHash: "2Q4Wx6eR8tY1uI5oP9sA3dF6gH9jK2nM7xC4vB8zE5qW2tY7rU4iO8pS1mL3nP",
  },
];

export function RewardsHistoryTable() {
  const getStatusBadge = (status: RewardTransaction["status"]) => {
    const variants = {
      completed: "bg-emerald-600 text-white",
      pending: "bg-yellow-600 text-white",
      failed: "bg-red-600 text-white",
    };

    const labels = {
      completed: "Completed",
      pending: "Pending",
      failed: "Failed",
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openSolanaExplorer = (txHash: string) => {
    window.open(`https://explorer.solana.com/tx/${txHash}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <History className="h-5 w-5 text-emerald-400" />
            Rewards History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-600 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300 font-semibold">
                    Date/Time
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold">
                    Transaction Hash
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-slate-600 hover:bg-slate-700/30 transition-colors"
                  >
                    <TableCell className="text-slate-300">
                      {new Date(transaction.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-baseline gap-1">
                        <span className="text-white font-semibold">
                          {transaction.amount}
                        </span>
                        <span className="text-slate-400">◎ SOL</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-sm">
                          {transaction.txHash.slice(0, 8)}...
                          {transaction.txHash.slice(-8)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                          onClick={() => copyToClipboard(transaction.txHash)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.status === "completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
                          onClick={() => openSolanaExplorer(transaction.txHash)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Show more button */}
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
            >
              Load More Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
