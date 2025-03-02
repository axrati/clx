<p align="center">
  <img src="icon.png" alt="clx"/>
</p>

<h1 align="center">
CLX
</h1>

An app for managing your library of notes, cli commands, etc. Helpful for managing things like ssh's to different services without having to remember host names/pem paths. Also good for taking notes and easily finding them.

## Fully keyboard accessible.

- `ctl`+`\` to hide and focus, type to search immediately.
- Use `tab` or `shift`+`tab` to move focus area.
- Use `enter` to click
- Use `space` to change your Tab Key Option.

## Tab Key Option

Table Key Option dictates which attribute in a row you focus on.

- `Copy` (default) - scroll through copy buttons
- `Expand` - scroll through expansion/compression buttons
- `Edit` - scroll through edit buttons
- `Delete` - scroll through delete buttons

## Intuitive Search

CLX stores items structured like this:

- `id` is a unique identifier.
- `title` is required, and helps organize your notes/commands.
- `description` is defaulted to `""` when creating notes/commands.
- `value` a detailed note or value you want to quickly access/copy.

#### Example organization:

When searching through large notes, its helpful to set your Tab Key Option to `Expand` so you can open/collapse the view.

Because of the autohide/autofocus on search, this could even be more ergonomic to save import URLs with.

```text
# Title
work internal portal

# Content
https://www.whatever.com/you/need/to/quickly/paste
```

When managing notes, it helps to switch the Tab Key Option to `Edit`. To better organize notes, you may want to leverage the colon based indexing (`a:b`) for more complex matches on your searches. It uses title as a way to filter more specifically using compounding criteria.

```text
# Title
work:meetings:abc-working-group

# Description
A running list of meeting minutes and notes from a certain group.

# Content
This can be multi-lined content than can go on as long as you need, all of it is searchable.
```

This is also a great way to store any code/functions you may need. Use the colon based indexing to even search across languages or functionality

```text
# Title
python:imports

# Description
ai nn torch neural layer

# Content
import torch
import torch.nn as nn
import torch.nn.functional as F
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
```

Seach terms that would match the below usecase:
`excel:math average`, `excel w`, `av`, etc

```text
# Title
excel:math

# Description:
weighted average

# Content
=LET(
  data, A2:A100,
  criteria, B2:B100,
  weights, C2:C100,
  validData, FILTER(data, (criteria="Include")*(data>0)),
  validWeights, FILTER(weights, (criteria="Include")*(data>0)),
  weightedAvg, SUM(validData * validWeights) / SUM(validWeights),
  weightedAvg
)
```

<br></br>

## Running Locally

```
npm install
npm start
```

<br></br>

## Installations

### Linux Install / Start / Uninstall

```bash
# Install
sudo apt update
npm run build-linux
sudo dpkg -i release/clx_1.0.0_amd64.deb

# Start
clx

# Uninstall
sudo dpkg -r clx
```

### Mac Install / Start / Uninstall

```bash
# Install
sudo apt update
npm run build-mac
sudo dpkg -i release/clx_1.0.0_amd64.deb

# Start
clx

# Uninstall
sudo dpkg -r clx
```

### Windows Install / Start / Uninstall

```bash
# Build
npm run build-win

# Start
cd release/win-unpacked
./clx.exe

# Uninstall
# Remove directory and shortcut you made to it
```
