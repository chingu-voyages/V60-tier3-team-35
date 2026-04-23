import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Alert, AlertDescription } from "@repo/ui/components/alert";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { CardTitle } from "@repo/ui/components/card";
import type { ResultSectionProps } from "../askAi.types";

function getConfidenceLabel(confidence: number): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} {
  if (confidence >= 70) return { label: "High confidence", variant: "default" };
  if (confidence >= 40)
    return { label: "Medium confidence", variant: "secondary" };
  return { label: "Low confidence", variant: "outline" };
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 70) return "bg-green-500";
  if (confidence >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export function ResultSection({
  preview,
  fileName,
  loading,
  error,
  diagnosis,
  onReset,
}: ResultSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl pb-12">
      {/* Image preview */}
      <div className="w-full rounded-3xl overflow-hidden h-64">
        <img
          src={preview}
          alt={fileName ?? "Uploaded plant"}
          className="w-full h-full object-contain "
        />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24 mt-1" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && !loading && (
        <Alert variant="destructive" className="w-full">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Diagnosis result */}
      {diagnosis && !loading && (
        <Card className="w-full shadow-sm ">
          <CardHeader className="pb-3">
            {/* Top match */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Best match
                </p>
                <h3 className="text-xl font-semibold text-foreground leading-tight">
                  {diagnosis.description}
                </h3>
              </div>
              <Badge variant={getConfidenceLabel(diagnosis.confidence).variant}>
                {diagnosis.confidence}%
              </Badge>
            </div>
            {/* Confidence bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{getConfidenceLabel(diagnosis.confidence).label}</span>
                <span>{diagnosis.confidence}% match</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getConfidenceColor(diagnosis.confidence)}`}
                  style={{ width: `${diagnosis.confidence}%` }}
                />
              </div>
            </div>
            {/* Low confidence warning */}
            {diagnosis.confidence < 40 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 rounded-lg px-3 py-2 mt-2">
                ⚠ Low confidence — try a clearer or closer photo for better
                results
              </p>
            )}{" "}
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-3">
            {/* Other possibilities */}
            {diagnosis.allMatches.length > 1 && (
              <>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Other possibilities
                </p>
                <div className="flex flex-col gap-2">
                  {diagnosis.allMatches.slice(1).map((match) => (
                    <div
                      key={match.name}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-sm text-foreground flex-1">
                        {match.description}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-muted-foreground/40 rounded-full"
                            style={{ width: `${match.confidence * 4}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-6 text-right">
                          {match.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Separator />

            {/* Remaining quota */}
            <p className="text-xs text-muted-foreground text-center">
              {diagnosis.remainingRequests} identifications remaining today
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reset button */}
      <Button
        variant="ghost"
        onClick={onReset}
        className="text-muted-foreground "
      >
        Upload another photo
      </Button>
    </div>
  );
}
