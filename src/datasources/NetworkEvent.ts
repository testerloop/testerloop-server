import { Log } from "../resolvers/types/generated";

const data: {
    [id: string]: {
        __typename: 'NetworkEvent',
        log: Log;
        testExecutionId: string
    }
} = {
    '1': {
        __typename: 'NetworkEvent',
        "testExecutionId": '12345',
        "startedDateTime": "2023-02-13T11:38:56.348Z",
        "_requestId": "423B7907FF67855071EA36763B341AD2",
        "_initialPriority": "VeryHigh",
        "_priority": "VeryHigh",
        "request": {
            "method": "GET",
            "url": "https://www.overloop.io/__/#/specs/runner?file=cypress/e2e/overloop.feature",
            "queryString": [],
            "headersSize": 836,
            "bodySize": 0,
            "cookies": [],
            "_comment": null,
            "headers": [
                { "name": "Referer", "value": "http://localhost:51723/" },
                { "name": "Upgrade-Insecure-Requests", "value": "1" },
                {
                    "name": "User-Agent",
                    "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/112.0.5571.0 Safari/537.36"
                },
                {
                    "name": "Accept",
                    "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
                },
                { "name": "Accept-Encoding", "value": "gzip, deflate, br" },
                { "name": "Accept-Language", "value": "en-US" },
                { "name": "Connection", "value": "keep-alive" },
                { "name": "Host", "value": "www.overloop.io" },
                { "name": "Referer", "value": "http://localhost:51723/" },
                { "name": "Sec-Fetch-Dest", "value": "document" },
                { "name": "Sec-Fetch-Mode", "value": "navigate" },
                { "name": "Sec-Fetch-Site", "value": "cross-site" },
                { "name": "Upgrade-Insecure-Requests", "value": "1" },
                {
                    "name": "User-Agent",
                    "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/112.0.5571.0 Safari/537.36"
                }
            ],
            "httpVersion": "http/1.1"
        },
        "time": 54.818,
        "_initiator": "http://localhost:51723/__cypress/runner/cypress_runner.js",
        "response": {
            "httpVersion": "http/1.1",
            "redirectURL": "",
            "status": 200,
            "statusText": "OK",
            "_comment": null,
            "content": {
                "mimeType": "text/html",
                "_comment": null,
                "encoding": null,
                "size": 25912,
                "text": "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <script type=\"module\" crossorigin src=\"./assets/polyfills.dabe60b8.js\"></script>\n\n  <meta charset=\"utf-8\" />\n  <link href=\"/__cypress/assets/favicon.png?v2\" rel=\"icon\">\n  <title>cypress-poc</title>\n  <link href=\"/__cypress/runner/favicon.ico?v2\" rel=\"icon\">\n  <script type=\"module\" crossorigin src=\"./assets/index.7b44b3bf.js\"></script>\n  <link rel=\"stylesheet\" href=\"./assets/index.9a55840c.css\">\n</head>\n\n\n      <body>\n        <script>\n          window.__RUN_MODE_SPECS__ = [{\"fileExtension\":\".feature\",\"baseName\":\"overloop.feature\",\"fileName\":\"overloop\",\"specFileExtension\":\".feature\",\"relativeToCommonRoot\":\"overloop.feature\",\"specType\":\"integration\",\"name\":\"cypress/e2e/overloop.feature\",\"relative\":\"cypress/e2e/overloop.feature\",\"absolute\":\"/Users/kalli.kavasi/overloop-framework/cypress-poc/cypress/e2e/overloop.feature\"}]\n          window.__CYPRESS_MODE__ = \"run\";\n          window.__CYPRESS_CONFIG__ = {\"projectName\":\"cypress-poc\",\"namespace\":\"__cypress\",\"base64Config\":\"eyJjb25maWdGaWxlIjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MvY3lwcmVzcy5jb25maWcuanMiLCJlbnYiOnsiX19jeXByZXNzX2N1Y3VtYmVyX3ByZXByb2Nlc3Nvcl9kb250X3VzZV90aGlzX3N1aXRlIjp7ImlzRXZlbnRIYW5kbGVyc0F0dGFjaGVkIjp0cnVlfX0sInRlc3RpbmdUeXBlIjoiZTJlIiwicHJvamVjdElkIjoidTlqYTdnIiwidmlkZW8iOmZhbHNlLCJzcGVjUGF0dGVybiI6ImN5cHJlc3MvZTJlLyoqLyouZmVhdHVyZSIsImV4Y2x1ZGVTcGVjUGF0dGVybiI6IiouanMiLCJzZXR1cE5vZGVFdmVudHMiOiJbRnVuY3Rpb24gc2V0dXBOb2RlRXZlbnRzXSIsInByb2plY3RSb290IjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MiLCJwcm9qZWN0TmFtZSI6ImN5cHJlc3MtcG9jIiwicmVwb1Jvb3QiOiIvVXNlcnMva2FsbGkua2F2YXNpL292ZXJsb29wLWZyYW1ld29yay9jeXByZXNzLXBvYyIsInJhd0pzb24iOnsicHJvamVjdElkIjoidTlqYTdnIiwidmlkZW8iOmZhbHNlLCJlMmUiOnsic3BlY1BhdHRlcm4iOiJjeXByZXNzL2UyZS8qKi8qLmZlYXR1cmUiLCJleGNsdWRlU3BlY1BhdHRlcm4iOiIqLmpzIiwic2V0dXBOb2RlRXZlbnRzIjoiW0Z1bmN0aW9uIHNldHVwTm9kZUV2ZW50c10ifSwic3BlY1BhdHRlcm4iOiJjeXByZXNzL2UyZS8qKi8qLmZlYXR1cmUiLCJleGNsdWRlU3BlY1BhdHRlcm4iOiIqLmpzIiwic2V0dXBOb2RlRXZlbnRzIjoiW0Z1bmN0aW9uIHNldHVwTm9kZUV2ZW50c10iLCJlbnZGaWxlIjp7fSwicHJvamVjdFJvb3QiOiIvVXNlcnMva2FsbGkua2F2YXNpL292ZXJsb29wLWZyYW1ld29yay9jeXByZXNzLXBvYyIsInByb2plY3ROYW1lIjoiY3lwcmVzcy1wb2MiLCJyZXBvUm9vdCI6Ii9Vc2Vycy9rYWxsaS5rYXZhc2kvb3Zlcmxvb3AtZnJhbWV3b3JrL2N5cHJlc3MtcG9jIn0sIm1vcmdhbiI6ZmFsc2UsImlzVGV4dFRlcm1pbmFsIjp0cnVlLCJzb2NrZXRJZCI6IjdjeTVyYmk5ZmYiLCJyZXBvcnQiOnRydWUsImFuaW1hdGlvbkRpc3RhbmNlVGhyZXNob2xkIjo1LCJhcmNoIjoieDY0IiwiYmFzZVVybCI6bnVsbCwiYmxvY2tIb3N0cyI6bnVsbCwiY2hyb21lV2ViU2VjdXJpdHkiOnRydWUsImNsaWVudENlcnRpZmljYXRlcyI6W10sImRlZmF1bHRDb21tYW5kVGltZW91dCI6NDAwMCwiZG93bmxvYWRzRm9sZGVyIjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MvY3lwcmVzcy9kb3dubG9hZHMiLCJleGVjVGltZW91dCI6NjAwMDAsImV4cGVyaW1lbnRhbEZldGNoUG9seWZpbGwiOmZhbHNlLCJleHBlcmltZW50YWxJbnRlcmFjdGl2ZVJ1bkV2ZW50cyI6ZmFsc2UsImV4cGVyaW1lbnRhbFNlc3Npb25BbmRPcmlnaW4iOmZhbHNlLCJleHBlcmltZW50YWxNb2RpZnlPYnN0cnVjdGl2ZVRoaXJkUGFydHlDb2RlIjpmYWxzZSwiZXhwZXJpbWVudGFsU291cmNlUmV3cml0aW5nIjpmYWxzZSwiZXhwZXJpbWVudGFsU2luZ2xlVGFiUnVuTW9kZSI6ZmFsc2UsImV4cGVyaW1lbnRhbFN0dWRpbyI6ZmFsc2UsImV4cGVyaW1lbnRhbFdlYktpdFN1cHBvcnQiOmZhbHNlLCJmaWxlU2VydmVyRm9sZGVyIjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MiLCJmaXh0dXJlc0ZvbGRlciI6Ii9Vc2Vycy9rYWxsaS5rYXZhc2kvb3Zlcmxvb3AtZnJhbWV3b3JrL2N5cHJlc3MtcG9jL2N5cHJlc3MvZml4dHVyZXMiLCJpbmNsdWRlU2hhZG93RG9tIjpmYWxzZSwia2V5c3Ryb2tlRGVsYXkiOjAsIm1vZGlmeU9ic3RydWN0aXZlQ29kZSI6dHJ1ZSwibnVtVGVzdHNLZXB0SW5NZW1vcnkiOjAsInBsYXRmb3JtIjoiZGFyd2luIiwicGFnZUxvYWRUaW1lb3V0Ijo2MDAwMCwicG9ydCI6NTE3MjMsInJlZGlyZWN0aW9uTGltaXQiOjIwLCJyZXBvcnRlciI6InNwZWMiLCJyZXBvcnRlck9wdGlvbnMiOm51bGwsInJlcXVlc3RUaW1lb3V0Ijo1MDAwLCJyZXNvbHZlZE5vZGVQYXRoIjoiL1VzZXJzL2thbGxpLmthdmFzaS8ubnZtL3ZlcnNpb25zL25vZGUvdjE2LjguMC9iaW4vbm9kZSIsInJlc29sdmVkTm9kZVZlcnNpb24iOiIxNi44LjAiLCJyZXNwb25zZVRpbWVvdXQiOjMwMDAwLCJyZXRyaWVzIjp7InJ1bk1vZGUiOjAsIm9wZW5Nb2RlIjowfSwic2NyZWVuc2hvdE9uUnVuRmFpbHVyZSI6dHJ1ZSwic2NyZWVuc2hvdHNGb2xkZXIiOiIvVXNlcnMva2FsbGkua2F2YXNpL292ZXJsb29wLWZyYW1ld29yay9jeXByZXNzLXBvYy9jeXByZXNzL3NjcmVlbnNob3RzIiwic2xvd1Rlc3RUaHJlc2hvbGQiOjEwMDAwLCJzY3JvbGxCZWhhdmlvciI6InRvcCIsInN1cHBvcnRGaWxlIjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MvY3lwcmVzcy9zdXBwb3J0L2UyZS5qcyIsInN1cHBvcnRGb2xkZXIiOiIvVXNlcnMva2FsbGkua2F2YXNpL292ZXJsb29wLWZyYW1ld29yay9jeXByZXNzLXBvYy9jeXByZXNzL3N1cHBvcnQiLCJ0YXNrVGltZW91dCI6NjAwMDAsInRlc3RJc29sYXRpb24iOiJsZWdhY3kiLCJ0cmFzaEFzc2V0c0JlZm9yZVJ1bnMiOnRydWUsInVzZXJBZ2VudCI6bnVsbCwidmlkZW9Db21wcmVzc2lvbiI6MzIsInZpZGVvc0ZvbGRlciI6Ii9Vc2Vycy9rYWxsaS5rYXZhc2kvb3Zlcmxvb3AtZnJhbWV3b3JrL2N5cHJlc3MtcG9jL2N5cHJlc3MvdmlkZW9zIiwidmlkZW9VcGxvYWRPblBhc3NlcyI6dHJ1ZSwidmlld3BvcnRIZWlnaHQiOjY2MCwidmlld3BvcnRXaWR0aCI6MTAwMCwid2FpdEZvckFuaW1hdGlvbnMiOnRydWUsIndhdGNoRm9yRmlsZUNoYW5nZXMiOmZhbHNlLCJhZGRpdGlvbmFsSWdub3JlUGF0dGVybiI6W10sImF1dG9PcGVuIjpmYWxzZSwiYnJvd3NlcnMiOlt7Im5hbWUiOiJjaHJvbWUiLCJmYW1pbHkiOiJjaHJvbWl1bSIsImNoYW5uZWwiOiJzdGFibGUiLCJkaXNwbGF5TmFtZSI6IkNocm9tZSIsInZlcnNpb24iOiIxMTAuMC41NDgxLjc3IiwicGF0aCI6Ii9BcHBsaWNhdGlvbnMvR29vZ2xlIENocm9tZS5hcHAvQ29udGVudHMvTWFjT1MvR29vZ2xlIENocm9tZSIsIm1pblN1cHBvcnRlZFZlcnNpb24iOjY0LCJtYWpvclZlcnNpb24iOiIxMTAifSx7Im5hbWUiOiJjaHJvbWl1bSIsImZhbWlseSI6ImNocm9taXVtIiwiY2hhbm5lbCI6InN0YWJsZSIsImRpc3BsYXlOYW1lIjoiQ2hyb21pdW0iLCJ2ZXJzaW9uIjoiMTEyLjAuNTU3MS4wIiwicGF0aCI6Ii9BcHBsaWNhdGlvbnMvQ2hyb21pdW0uYXBwL0NvbnRlbnRzL01hY09TL0Nocm9taXVtIiwibWluU3VwcG9ydGVkVmVyc2lvbiI6NjQsIm1ham9yVmVyc2lvbiI6IjExMiJ9LHsibmFtZSI6ImVsZWN0cm9uIiwiY2hhbm5lbCI6InN0YWJsZSIsImZhbWlseSI6ImNocm9taXVtIiwiZGlzcGxheU5hbWUiOiJFbGVjdHJvbiIsInZlcnNpb24iOiIxMDYuMC41MjQ5LjUxIiwicGF0aCI6IiIsIm1ham9yVmVyc2lvbiI6MTA2fV0sImNsaWVudFJvdXRlIjoiL19fLyIsImN5cHJlc3NCaW5hcnlSb290IjoiL1VzZXJzL2thbGxpLmthdmFzaS9MaWJyYXJ5L0NhY2hlcy9DeXByZXNzLzEwLjEwLjAvQ3lwcmVzcy5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcCIsImRldlNlcnZlclB1YmxpY1BhdGhSb3V0ZSI6Ii9fX2N5cHJlc3Mvc3JjIiwiaG9zdHMiOm51bGwsImlzSW50ZXJhY3RpdmUiOnRydWUsIm5hbWVzcGFjZSI6Il9fY3lwcmVzcyIsInJlcG9ydGVyUm91dGUiOiIvX19jeXByZXNzL3JlcG9ydGVyIiwic29ja2V0SW9Db29raWUiOiJfX3NvY2tldCIsInNvY2tldElvUm91dGUiOiIvX19zb2NrZXQiLCJ2ZXJzaW9uIjoiMTAuMTAuMCIsInhoclJvdXRlIjoiL3hocnMvIiwiY3lwcmVzc0VudiI6InByb2R1Y3Rpb24iLCJyZXNvbHZlZCI6eyJhbmltYXRpb25EaXN0YW5jZVRocmVzaG9sZCI6eyJ2YWx1ZSI6NSwiZnJvbSI6ImRlZmF1bHQifSwiYXJjaCI6eyJ2YWx1ZSI6Ing2NCIsImZyb20iOiJkZWZhdWx0In0sImJhc2VVcmwiOnsidmFsdWUiOm51bGwsImZyb20iOiJkZWZhdWx0In0sImJsb2NrSG9zdHMiOnsidmFsdWUiOm51bGwsImZyb20iOiJkZWZhdWx0In0sImNocm9tZVdlYlNlY3VyaXR5Ijp7InZhbHVlIjp0cnVlLCJmcm9tIjoiZGVmYXVsdCJ9LCJjbGllbnRDZXJ0aWZpY2F0ZXMiOnsidmFsdWUiOltdLCJmcm9tIjoiZGVmYXVsdCJ9LCJkZWZhdWx0Q29tbWFuZFRpbWVvdXQiOnsidmFsdWUiOjQwMDAsImZyb20iOiJkZWZhdWx0In0sImRvd25sb2Fkc0ZvbGRlciI6eyJ2YWx1ZSI6ImN5cHJlc3MvZG93bmxvYWRzIiwiZnJvbSI6ImRlZmF1bHQifSwiZW52Ijp7Il9fY3lwcmVzc19jdWN1bWJlcl9wcmVwcm9jZXNzb3JfZG9udF91c2VfdGhpc19zdWl0ZSI6eyJ2YWx1ZSI6eyJpc0V2ZW50SGFuZGxlcnNBdHRhY2hlZCI6dHJ1ZX0sImZyb20iOiJwbHVnaW4ifX0sImV4ZWNUaW1lb3V0Ijp7InZhbHVlIjo2MDAwMCwiZnJvbSI6ImRlZmF1bHQifSwiZXhwZXJpbWVudGFsRmV0Y2hQb2x5ZmlsbCI6eyJ2YWx1ZSI6ZmFsc2UsImZyb20iOiJkZWZhdWx0In0sImV4cGVyaW1lbnRhbEludGVyYWN0aXZlUnVuRXZlbnRzIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImRlZmF1bHQifSwiZXhwZXJpbWVudGFsU2Vzc2lvbkFuZE9yaWdpbiI6eyJ2YWx1ZSI6ZmFsc2UsImZyb20iOiJkZWZhdWx0In0sImV4cGVyaW1lbnRhbE1vZGlmeU9ic3RydWN0aXZlVGhpcmRQYXJ0eUNvZGUiOnsidmFsdWUiOmZhbHNlLCJmcm9tIjoiZGVmYXVsdCJ9LCJleHBlcmltZW50YWxTb3VyY2VSZXdyaXRpbmciOnsidmFsdWUiOmZhbHNlLCJmcm9tIjoiZGVmYXVsdCJ9LCJleHBlcmltZW50YWxTaW5nbGVUYWJSdW5Nb2RlIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImRlZmF1bHQifSwiZXhwZXJpbWVudGFsU3R1ZGlvIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImRlZmF1bHQifSwiZXhwZXJpbWVudGFsV2ViS2l0U3VwcG9ydCI6eyJ2YWx1ZSI6ZmFsc2UsImZyb20iOiJkZWZhdWx0In0sImZpbGVTZXJ2ZXJGb2xkZXIiOnsidmFsdWUiOiIiLCJmcm9tIjoiZGVmYXVsdCJ9LCJmaXh0dXJlc0ZvbGRlciI6eyJ2YWx1ZSI6ImN5cHJlc3MvZml4dHVyZXMiLCJmcm9tIjoiZGVmYXVsdCJ9LCJleGNsdWRlU3BlY1BhdHRlcm4iOnsidmFsdWUiOiIqLmpzIiwiZnJvbSI6ImNvbmZpZyJ9LCJpbmNsdWRlU2hhZG93RG9tIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImRlZmF1bHQifSwia2V5c3Ryb2tlRGVsYXkiOnsidmFsdWUiOjAsImZyb20iOiJkZWZhdWx0In0sIm1vZGlmeU9ic3RydWN0aXZlQ29kZSI6eyJ2YWx1ZSI6dHJ1ZSwiZnJvbSI6ImRlZmF1bHQifSwibm9kZVZlcnNpb24iOnsiZnJvbSI6ImRlZmF1bHQifSwibnVtVGVzdHNLZXB0SW5NZW1vcnkiOnsidmFsdWUiOjAsImZyb20iOiJjb25maWcifSwicGxhdGZvcm0iOnsidmFsdWUiOiJkYXJ3aW4iLCJmcm9tIjoiZGVmYXVsdCJ9LCJwYWdlTG9hZFRpbWVvdXQiOnsidmFsdWUiOjYwMDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJwb3J0Ijp7InZhbHVlIjpudWxsLCJmcm9tIjoiZGVmYXVsdCJ9LCJwcm9qZWN0SWQiOnsidmFsdWUiOiJ1OWphN2ciLCJmcm9tIjoiY29uZmlnIn0sInJlZGlyZWN0aW9uTGltaXQiOnsidmFsdWUiOjIwLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXBvcnRlciI6eyJ2YWx1ZSI6InNwZWMiLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXBvcnRlck9wdGlvbnMiOnsidmFsdWUiOm51bGwsImZyb20iOiJkZWZhdWx0In0sInJlcXVlc3RUaW1lb3V0Ijp7InZhbHVlIjo1MDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXNvbHZlZE5vZGVQYXRoIjp7InZhbHVlIjpudWxsLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXNvbHZlZE5vZGVWZXJzaW9uIjp7InZhbHVlIjpudWxsLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXNwb25zZVRpbWVvdXQiOnsidmFsdWUiOjMwMDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJyZXRyaWVzIjp7InZhbHVlIjp7InJ1bk1vZGUiOjAsIm9wZW5Nb2RlIjowfSwiZnJvbSI6ImRlZmF1bHQifSwic2NyZWVuc2hvdE9uUnVuRmFpbHVyZSI6eyJ2YWx1ZSI6dHJ1ZSwiZnJvbSI6ImRlZmF1bHQifSwic2NyZWVuc2hvdHNGb2xkZXIiOnsidmFsdWUiOiJjeXByZXNzL3NjcmVlbnNob3RzIiwiZnJvbSI6ImRlZmF1bHQifSwic2xvd1Rlc3RUaHJlc2hvbGQiOnsidmFsdWUiOjEwMDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJzY3JvbGxCZWhhdmlvciI6eyJ2YWx1ZSI6InRvcCIsImZyb20iOiJkZWZhdWx0In0sInN1cHBvcnRGaWxlIjp7InZhbHVlIjoiY3lwcmVzcy9zdXBwb3J0L2UyZS57anMsanN4LHRzLHRzeH0iLCJmcm9tIjoiZGVmYXVsdCJ9LCJzdXBwb3J0Rm9sZGVyIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImRlZmF1bHQifSwidGFza1RpbWVvdXQiOnsidmFsdWUiOjYwMDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJ0ZXN0SXNvbGF0aW9uIjp7InZhbHVlIjoibGVnYWN5IiwiZnJvbSI6ImRlZmF1bHQifSwidHJhc2hBc3NldHNCZWZvcmVSdW5zIjp7InZhbHVlIjp0cnVlLCJmcm9tIjoiZGVmYXVsdCJ9LCJ1c2VyQWdlbnQiOnsidmFsdWUiOm51bGwsImZyb20iOiJkZWZhdWx0In0sInZpZGVvIjp7InZhbHVlIjpmYWxzZSwiZnJvbSI6ImNvbmZpZyJ9LCJ2aWRlb0NvbXByZXNzaW9uIjp7InZhbHVlIjozMiwiZnJvbSI6ImRlZmF1bHQifSwidmlkZW9zRm9sZGVyIjp7InZhbHVlIjoiY3lwcmVzcy92aWRlb3MiLCJmcm9tIjoiZGVmYXVsdCJ9LCJ2aWRlb1VwbG9hZE9uUGFzc2VzIjp7InZhbHVlIjp0cnVlLCJmcm9tIjoiZGVmYXVsdCJ9LCJ2aWV3cG9ydEhlaWdodCI6eyJ2YWx1ZSI6NjYwLCJmcm9tIjoiZGVmYXVsdCJ9LCJ2aWV3cG9ydFdpZHRoIjp7InZhbHVlIjoxMDAwLCJmcm9tIjoiZGVmYXVsdCJ9LCJ3YWl0Rm9yQW5pbWF0aW9ucyI6eyJ2YWx1ZSI6dHJ1ZSwiZnJvbSI6ImRlZmF1bHQifSwid2F0Y2hGb3JGaWxlQ2hhbmdlcyI6eyJ2YWx1ZSI6ZmFsc2UsImZyb20iOiJjb25maWcifSwic3BlY1BhdHRlcm4iOnsidmFsdWUiOiJjeXByZXNzL2UyZS8qKi8qLmZlYXR1cmUiLCJmcm9tIjoiY29uZmlnIn0sImJyb3dzZXJzIjp7InZhbHVlIjpbeyJuYW1lIjoiY2hyb21lIiwiZmFtaWx5IjoiY2hyb21pdW0iLCJjaGFubmVsIjoic3RhYmxlIiwiZGlzcGxheU5hbWUiOiJDaHJvbWUiLCJ2ZXJzaW9uIjoiMTEwLjAuNTQ4MS43NyIsInBhdGgiOiIvQXBwbGljYXRpb25zL0dvb2dsZSBDaHJvbWUuYXBwL0NvbnRlbnRzL01hY09TL0dvb2dsZSBDaHJvbWUiLCJtaW5TdXBwb3J0ZWRWZXJzaW9uIjo2NCwibWFqb3JWZXJzaW9uIjoiMTEwIn0seyJuYW1lIjoiY2hyb21pdW0iLCJmYW1pbHkiOiJjaHJvbWl1bSIsImNoYW5uZWwiOiJzdGFibGUiLCJkaXNwbGF5TmFtZSI6IkNocm9taXVtIiwidmVyc2lvbiI6IjExMi4wLjU1NzEuMCIsInBhdGgiOiIvQXBwbGljYXRpb25zL0Nocm9taXVtLmFwcC9Db250ZW50cy9NYWNPUy9DaHJvbWl1bSIsIm1pblN1cHBvcnRlZFZlcnNpb24iOjY0LCJtYWpvclZlcnNpb24iOiIxMTIiLCJpc0hlYWRsZXNzIjp0cnVlLCJpc0hlYWRlZCI6ZmFsc2V9LHsibmFtZSI6ImVsZWN0cm9uIiwiY2hhbm5lbCI6InN0YWJsZSIsImZhbWlseSI6ImNocm9taXVtIiwiZGlzcGxheU5hbWUiOiJFbGVjdHJvbiIsInZlcnNpb24iOiIxMDYuMC41MjQ5LjUxIiwicGF0aCI6IiIsIm1ham9yVmVyc2lvbiI6MTA2fV0sImZyb20iOiJydW50aW1lIn0sImhvc3RzIjp7InZhbHVlIjpudWxsLCJmcm9tIjoiZGVmYXVsdCJ9LCJpc0ludGVyYWN0aXZlIjp7InZhbHVlIjp0cnVlLCJmcm9tIjoiZGVmYXVsdCJ9LCJjb25maWdGaWxlIjp7InZhbHVlIjoiL1VzZXJzL2thbGxpLmthdmFzaS9vdmVybG9vcC1mcmFtZXdvcmsvY3lwcmVzcy1wb2MvY3lwcmVzcy5jb25maWcuanMiLCJmcm9tIjoicGx1Z2luIn0sInRlc3RpbmdUeXBlIjp7InZhbHVlIjoiZTJlIiwiZnJvbSI6InBsdWdpbiJ9fSwiYnJvd3NlclVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3MjMvX18vIiwicHJveHlTZXJ2ZXIiOiJodHRwOi8vbG9jYWxob3N0OjUxNzIzIiwicHJveHlVcmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzIzIiwicmVtb3RlIjp7ImF1dGgiOm51bGwsIm9yaWdpbiI6Imh0dHBzOi8vd3d3Lm92ZXJsb29wLmlvIiwic3RyYXRlZ3kiOiJodHRwIiwiZmlsZVNlcnZlciI6bnVsbCwiZG9tYWluTmFtZSI6Im92ZXJsb29wLmlvIiwicHJvcHMiOnsicG9ydCI6IjQ0MyIsInByb3RvY29sIjoiaHR0cHM6IiwiZG9tYWluIjoib3Zlcmxvb3AiLCJ0bGQiOiJpbyJ9fSwicmVwb3J0ZXJVcmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzIzL19fY3lwcmVzcy9yZXBvcnRlciIsInhoclVybCI6Il9fY3lwcmVzcy94aHJzLyIsImJyb3dzZXIiOnsibmFtZSI6ImNocm9taXVtIiwiZmFtaWx5IjoiY2hyb21pdW0iLCJjaGFubmVsIjoic3RhYmxlIiwiZGlzcGxheU5hbWUiOiJDaHJvbWl1bSIsInZlcnNpb24iOiIxMTIuMC41NTcxLjAiLCJwYXRoIjoiL0FwcGxpY2F0aW9ucy9DaHJvbWl1bS5hcHAvQ29udGVudHMvTWFjT1MvQ2hyb21pdW0iLCJtaW5TdXBwb3J0ZWRWZXJzaW9uIjo2NCwibWFqb3JWZXJzaW9uIjoiMTEyIiwiaXNIZWFkbGVzcyI6dHJ1ZSwiaXNIZWFkZWQiOmZhbHNlfX0=\",\"hideCommandLog\":false};\n          window.__CYPRESS_TESTING_TYPE__ = 'e2e'\n          window.__CYPRESS_BROWSER__ = {\"name\":\"chromium\",\"family\":\"chromium\",\"channel\":\"stable\",\"displayName\":\"Chromium\",\"version\":\"112.0.5571.0\",\"path\":\"/Applications/Chromium.app/Contents/MacOS/Chromium\",\"minSupportedVersion\":64,\"majorVersion\":\"112\"}\n          \n        </script>\n    \n  <div id=\"app\"></div>\n\n  <script type=\"text/javascript\">\n    // set a global so we know the 'top' window\n    window.__Cypress__ = true\n  </script>\n\n  \n</body>\n\n</html>",
                "compression": 21390
            },
            "headersSize": 288,
            "bodySize": 4522,
            "cookies": [],
            "headers": [
                { "name": "Connection", "value": "keep-alive" },
                { "name": "Content-Encoding", "value": "gzip" },
                { "name": "Content-Type", "value": "text/html; charset=utf-8" },
                { "name": "Date", "value": "Mon, 13 Feb 2023 11:38:56 GMT" },
                {
                    "name": "ETag",
                    "value": "W/\"329c-PWTq95ht4HlsaYVeugqM2gagSgw\""
                },
                { "name": "Keep-Alive", "value": "timeout=5" },
                { "name": "Origin-Agent-Cluster", "value": "?0" },
                { "name": "Transfer-Encoding", "value": "chunked" },
                { "name": "Vary", "value": "Accept-Encoding" }
            ],
            "_transferSize": 4810
        },
        "serverIPAddress": "127.0.0.1",
        "timings": {
            "blocked": 0.704,
            "dns": -1,
            "connect": 49.921,
            "send": 0.077,
            "wait": 3.669,
            "receive": 0.447,
            "ssl": 48.686,
            "_queued": 0.989
        },
        "_requestTime": 163241.228518,
        "_chunks": [{ "ts": 61.769, "bytes": 12956 }]
    }
}


export class NetworkEvent {
    getById(id: string) {
        return data[id] ?? null;
    }
}
