# Call Logs

## Preface

| Item            | Content                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------- |
| Target Audience | User                                                                                        |
| Navigation Path | My Calls > Call Logs                                                                        |
| Overview        | View detailed records of each model call to support problem investigation and data analysis |

## Page Structure

### Search Area

The page top supports selecting time range, model name, model type, and call status for filtering.

### Action Buttons

The page top-right provides an export button (if available).

### Data List

The page displays all call records in reverse chronological order in table format.

### Page Screenshot

![Call Logs](./images/call-logs.png)

## Operations

### Viewing Call Logs

1. Enter the platform homepage, click the **"My Calls > Call Logs"** menu in the left navigation bar to enter the call logs page.
2. Set filter parameters at the top of the page:
   - Time range: select the start and end dates to query;
   - Model: enter the model name for fuzzy search;
   - Model Type: filter by type, such as chat / multimodal / video model, etc.;
   - Call Status: filter by status, such as success / failure.
   - After setting, click the **"Search"** button to load data; click **"Reset"** to clear all filter conditions.
3. View the call logs list. The table displays all call records in reverse chronological order:
   - Call Time: timestamp when the request occurred;
   - Model: the model name and identifier for this call;
   - Model Type: such as chat model, multimodal, video model, etc.;
   - Call Status: success / failure;
   - Usage: consumed input / output Tokens (for text/multimodal models) or duration (for video models);
   - Time Consumed: total time from request initiation to complete end, reflecting overall model performance;
   - First TOKEN Time: time from request initiation to returning the first Token, reflecting model response speed;
   - Failure Type: classification of failed requests, such as system exception, rate limit, model error, etc. (only displayed for failed records);
   - Error Information: specific error description of the failed request (only displayed for failed records);
   - Operations: click "Details" to view complete information of a single call.

### Viewing Single Call Details

1. Click the **"Details"** button of any record to open the details popup.
2. View complete call information:
   - Basic Information: model name, call time, model type, total time consumed, first Token time, call status;
   - Consumption Details: input / output Token consumption details.

#### Parameters

| Term | Type | Example | Description |
|------|------|---------|-------------|
| Time Range | Date Range | `2026-05-07 to 2026-05-14` | The time period for filtering call logs |
| Model | Text | `Qwen3.6-plus` | The model name for fuzzy search |
| Model Type | Tag | `Chat / Multimodal / Video` | The functional type for filtering |
| Call Status | Tag | `Success / Failure` | The result of this call |
| Usage | Text | `Input: 22 Tokens / Output: 150 Tokens` | Resources consumed by this call: text/multimodal models are input and output Token count, video models are generation duration |
| Time Consumed | Number | `1417` | Total time from request initiation to complete end, reflecting overall model performance |
| First TOKEN Time | Number | `320` | Time from request initiation to returning the first Token, reflecting model response speed |
| Failure Type | Tag | `System Exception / Rate Limit / Model Error` | Classification of failed requests |
| Error Information | Text | `Rate limit exceeded` | Specific error description of the failed request, which can be used for problem investigation |

## Notes

* You can use a combination of time range, model name, model type, or call status at the top for combined filtering to quickly locate target records.
* Click the "Details" button of any record to view complete information of that call.