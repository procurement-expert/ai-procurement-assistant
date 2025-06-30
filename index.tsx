
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles } from "lucide-react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/generate-quote", { description });
      setQuote(res.data.quote);
    } catch (err) {
      setQuote("Error generating quote. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Smart Procurement Assistant</h1>
      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <label className="font-semibold">Enter procurement item or service details:</label>
          <Textarea
            placeholder="e.g., 24in Carbon Steel Lug Butterfly Valve with Xtreme seat, 150#, 2 pcs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={generateQuote} disabled={loading} className="flex gap-2">
            <Sparkles className="w-4 h-4" /> {loading ? "Generating..." : "Generate Quote"}
          </Button>
        </CardContent>
      </Card>

      {quote && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Generated Quotation
            </h2>
            <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{quote}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
