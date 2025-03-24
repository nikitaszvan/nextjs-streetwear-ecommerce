import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { client } from "@/lib/config/dynamodb-config";

const docClient = DynamoDBDocumentClient.from(client);

export const fetchCategoryProducts = async (pk: string) => {
  try {
    const command = new QueryCommand({
      TableName: "streetwear-ecommerce-imageurls",
      KeyConditionExpression: "category_pk = :pk",
      ExpressionAttributeValues: {
        ":pk": decodeURIComponent(pk)
      }
    });

    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}