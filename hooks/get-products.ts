import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { client } from "@/lib/dynamodb";

const docClient = DynamoDBDocumentClient.from(client);

export async function fetchCategoryProducts(pk: string) {
  try {
    const command = new QueryCommand({
      TableName: "streetwear-ecommerce-imageurls",
      KeyConditionExpression: "category_pk = :pk",  // Match your table's attribute name
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