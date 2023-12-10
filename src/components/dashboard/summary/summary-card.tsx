import { Button, Card, CardBody, Link as NextUILink } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { SummaryCardProps } from "@/lib/types/types";
import CountUpValue from "@/components/countup-value";

function SummaryCard(props: SummaryCardProps) {
  return (
    <Card>
      <CardBody className="flex-row gap-3">
        <Button isIconOnly radius="full" className={`mt-1 ${props.bgcolor}`}>
          <props.icon />
        </Button>
        <div className="w-full">
          <span className="text-xs capitalize text-muted-foreground">
            {props.title}
          </span>
          <h3 className="text-2xl font-medium">
            <CountUpValue
              value={Number(props.value)}
              isCurrency={props.title === "Total Revenue"}
            />
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <NextUILink
              size="sm"
              as={Link}
              href={props.url}
              underline="none"
              className={`${props.color}`}
            >
              View all <MoveRight size={15} className="ms-1" />
            </NextUILink>
            {props.percentage && (
              <div className="flex flex-col text-right">
                <span
                  className={`${
                    props.percentage.increased ? "text-success" : "text-danger"
                  } block font-medium`}
                >
                  {props.percentage.increased ? "+" : "-"}{" "}
                  {props.percentage.value} %
                </span>
                <span className="text-xs text-muted-foreground">
                  this month
                </span>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default SummaryCard;
