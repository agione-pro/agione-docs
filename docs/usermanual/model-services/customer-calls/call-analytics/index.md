# Call Analytics

## Preface

| Item            | Content                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Target Audience | User                                                                                            |
| Navigation Path | Customer Calls > Call Analytics                                                                 |
| Overview        | View call statistics by customer or model dimension to support in-depth analysis of call status |

## Page Structure

### Search Area

The page top supports selecting time range, customer name, model name, model type, and model ID for filtering.

### Action Buttons

The page contains "Customer List" and "Model List" two tabs. Each customer or model provides "View Details" and "View Logs" operations.

### Data List

The page displays customer or model call statistics in table format.

### Page Screenshot

![Call Analytics](./images/call-analytics.png)

## Operations

### Entering the Page

1. Click the **"Customer Calls > Call Analytics"** in the left navigation bar to enter the statistics page.
2. The page contains **"Customer List"** and **"Model List"** two tabs.

### Customer List Tab (By Customer Dimension)

1. Set filter conditions:
   - Time range: select the start and end dates to query;
   - Customer Name: enter the customer name for fuzzy search;
   - Model Name: enter the model name for filtering.
   - After setting, click **"Search"** to load data; click **"Reset"** to clear filter conditions.
2. View the customer list. The table displays call statistics summarized by customer:
   - Customer Name;
   - Number of Models Used (total number of models called by this customer);
   - Successful / Failed call counts;
   - Rate limit trigger counts;
   - Operations column: click "View Details" to enter the customer details page.
3. View customer details page:
   - Core metric cards: total calls, successful calls, failed calls, rate limit triggers, total Token consumption;
   - Call trends chart: line chart showing successful / failed / rate limit call distribution by date;
   - Token consumption trends chart: line chart showing input / output Token consumption distribution by date;
   - Failed / Rate Limit Trigger TOP5 records: view the customer's main problem call records. You can click "View Logs" to locate specific requests.

#### Parameters

| Term | Type | Example | Description |
|------|------|---------|-------------|
| Time Range | Date Range | `2026-05-07 to 2026-05-14` | The time period for statistics |
| Customer Name | Text | `Customer-123` | The customer name for fuzzy search |
| Model Name | Text | `Qwen3.6-plus` | The model name for filtering |
| Number of Models Used | Number | `5` | Total number of models called by this customer |
| Successful Calls | Number | `1,234` | Number of successful calls by this customer |
| Failed Calls | Number | `56` | Number of failed calls by this customer |
| Rate Limit Triggers | Number | `12` | Number of rate limit triggers for this customer |

### Model List Tab (By Model Dimension)

1. Set filter conditions:
   - Time range: select the start and end dates to query;
   - Model Name: enter the model name for fuzzy search;
   - Model Type: filter by type, such as chat / multimodal / video model, etc.;
   - Model ID: enter the model unique identifier for exact search.
   - After setting, click **"Search"** to load data; click **"Reset"** to clear filter conditions.
2. View the model list. The table displays call statistics summarized by model:
   - Model Name, Model Type;
   - Customer Name (customers who called this model);
   - Successful / Failed call counts;
   - Usage: consumed input / output Tokens (for text/multimodal models) or duration (for video models);
   - Operations column: click "View Details" to enter the model details page, click "View Logs" to jump to the call logs page.
3. View model details page:
   - Core metric cards: total calls, successful calls, failed calls, rate limit triggers, total Token consumption;
   - Call trends chart: line chart showing successful / failed / rate limit call distribution by date;
   - Token consumption trends chart: line chart showing input / output Token consumption distribution by date;
   - Failed / Rate Limit Trigger TOP5 records: view the model's main problem call records. You can click "View Logs" to locate specific requests.

#### Parameters

| Term | Type | Example | Description |
|------|------|---------|-------------|
| Time Range | Date Range | `2026-05-07 to 2026-05-14` | The time period for statistics |
| Model Name | Text | `Qwen3.6-plus` | The model name for fuzzy search |
| Model Type | Tag | `Chat / Multimodal / Video` | The functional type for filtering |
| Model ID | Text | `qwen/qwen3.6-plus` | The unique identifier for exact search |
| Model Name | Text | `Qwen3.6-plus` | The name of the model |
| Model Type | Tag | `Chat Model` | The functional type of the model |
| Customer Name | Text | `Customer-123` | The customer who called this model |
| Successful Calls | Number | `2,134` | Number of successful calls for this model |
| Failed Calls | Number | `89` | Number of failed calls for this model |
| Usage | Text | `Input: 122.5M Tokens / Output: 619.4K Tokens` | Resources consumed: text models are Token count, video models are duration |

#### Key Operations

| Operation    | Description                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Switch Tabs  | Click "Customer List" or "Model List" to switch between different analysis perspectives                                |
| View Details | Click **"View Details"** after any customer or model to enter the exclusive details page for in-depth analysis         |
| View Logs    | Click **"View Logs"** to directly jump to the corresponding customer / model's call log list for problem investigation |

## Notes

* Filter conditions support multi-condition combinations, which can improve positioning efficiency.
* You can view detailed call trends and consumption data on the details page.