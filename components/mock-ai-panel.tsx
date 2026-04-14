"use client";

import { useState } from "react";
import { Device } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";

interface MockAiPanelProps {
  devices: Device[];
  filteredDevices: Device[];
}

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const QUICK_DEMO_QUESTION =
  "Who are the high-risk individuals in the current filtered view?";

export function MockAiPanel({ devices, filteredDevices }: MockAiPanelProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I am a  AI agent. Ask about risk counts, zones, or high-risk individuals.",
    },
  ]);

  const getMockResponse = (question: string) => {
    const q = question.toLowerCase();
    const highRisk = filteredDevices.filter((d) => d.riskLevel === "high");
    const mediumRisk = filteredDevices.filter(
      (d) => d.riskLevel === "medium",
    ).length;
    const lowRisk = filteredDevices.filter((d) => d.riskLevel === "low").length;
    const inactive = filteredDevices.filter(
      (d) => d.status === "inactive",
    ).length;

    if (q.includes("high-risk") || q.includes("high risk")) {
      if (highRisk.length === 0) {
        return "There are no high-risk individuals in the current filtered results.";
      }

      const topNames = highRisk
        .slice(0, 5)
        .map((d) => d.name)
        .join(", ");
      return `I found ${highRisk.length} high-risk individuals. Top names: ${topNames}.`;
    }

    if (q.includes("zone")) {
      const zoneCounts = filteredDevices.reduce<Record<string, number>>(
        (acc, d) => {
          acc[d.zone] = (acc[d.zone] ?? 0) + 1;
          return acc;
        },
        {},
      );
      const summary = Object.entries(zoneCounts)
        .map(([zone, count]) => `${zone}: ${count}`)
        .join(" | ");
      return summary.length > 0
        ? `Current zone distribution: ${summary}`
        : "No zone data found in the current filter.";
    }

    if (q.includes("summary") || q.includes("status") || q.includes("risk")) {
      return `Filtered summary: ${filteredDevices.length}/${devices.length} individuals shown. High: ${highRisk.length}, Medium: ${mediumRisk}, Low: ${lowRisk}, Inactive: ${inactive}.`;
    }

    return "Mock response: For this demo, I can summarize risk levels, status, and zone distribution from the current filtered data.";
  };

  const sendMessage = (rawText?: string) => {
    const text = (rawText ?? message).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      text,
    };

    const aiMsg: ChatMessage = {
      id: Date.now() + 1,
      role: "assistant",
      text: getMockResponse(text),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setMessage("");
  };

  return (
    <Card className="p-4 bg-white border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-red-600" />
        <h3 className="text-sm font-semibold text-gray-900">AI Agent</h3>
      </div>

      <p className="text-xs text-gray-600 mb-3">
        Demo panel with mock answers based on the currently filtered map data.
      </p>

      <div className="space-y-2 mb-3 max-h-64 overflow-y-auto rounded-md border border-gray-200 p-2 bg-gray-50">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`text-xs rounded-md px-3 py-2 ${
              item.role === "assistant"
                ? "bg-white border border-gray-200 text-gray-800"
                : "bg-red-600 text-white ml-6"
            }`}
          >
            <p className="font-semibold mb-1">
              {item.role === "assistant" ? "AI Agent" : "You"}
            </p>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about risks, zones, or status..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            className="w-full"
            onClick={() => sendMessage()}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4 mr-1" />
            Send
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => sendMessage(QUICK_DEMO_QUESTION)}
          >
            Mock Question
          </Button>
        </div>
      </div>
    </Card>
  );
}
