# spot-castify

When you answer questions, we recommend podcasts for you.

1. Select the category of podcasts you want to listen to.
2. Choose the genre you want to listen to from 1.

## install

```
% npm install -g spot-castify

# Run only for the first time
# Check 'How to set access token' in this document.
% spot-castify settoken

% spot-castify
```

## How to set access token

1. Access and login your Spotify Dashboard: https://developer.spotify.com/dashboard/
2. Choose 'Create app' and create your app.(Redirect URI：
   `http://localhost:8888/callback`)
   ![developer spotify com_dashboard_create](https://github.com/MikotoMakizuru/spot-castify/assets/56577866/1446af45-d3cc-4602-9139-0b47817f2f9b)
3. Copy your 'Client ID' and 'Client Secret' for the next step.
   ![スクリーンショット 2024-05-05 15 14 04](https://github.com/MikotoMakizuru/spot-castify/assets/56577866/aef688f4-9e66-4da4-b92e-86b7c9fe1f1f)
4. Run `spot-castify settoken` and enter your credentials. You can retrive access token

## Usage

```
Usage: spot-castify [options] [command]

Options:
  -h, --help      display help for command

Commands:
  searchPodcast   <Default> Here are some podcast recommendations from spotify. Note:Require
                  'spot-castify settoken' command before the first time you run.
  settoken        Login Spotify via authorization code flow (Refer:
                  https://developer.spotify.com/documentation/general/guides/authorization-guide/).
  help [command]  display help for command
```

https://github.com/MikotoMakizuru/spot-castify/assets/56577866/79aeb3da-f350-4647-bd7f-44d63e3821f4
