defmodule Memory.Game do
  def new do
    %{
      tiles: init_tiles(),
      openTile: -1,
      matches: 0,
      clicks: 0,
      clickDisable: false
    }
  end

  def init_tiles do
    [%{value: "A", display: false, done: false},
     %{value: "A", display: false, done: false},
     %{value: "B", display: false, done: false},
     %{value: "B", display: false, done: false},
     %{value: "C", display: false, done: false},
     %{value: "C", display: false, done: false},
     %{value: "D", display: false, done: false},
     %{value: "D", display: false, done: false},
     %{value: "E", display: false, done: false},
     %{value: "E", display: false, done: false},
     %{value: "F", display: false, done: false},
     %{value: "F", display: false, done: false},
     %{value: "G", display: false, done: false},
     %{value: "G", display: false, done: false},
     %{value: "H", display: false, done: false},
     %{value: "H", display: false, done: false}]
    |> Enum.shuffle()
  end


  def firstTile(game, i) do
    newVal = game.tiles
      |> Enum.at(i)
      |> Map.replace!( :display, true)

    updatedTiles = List.replace_at(game.tiles,i,newVal)

    Map.replace!(game, :tiles, updatedTiles)
    |> Map.replace!( :clicks, game.clicks+1)
    |> Map.replace!( :openTile, i)
  end

  def tileMatch(game, i) do
    tile1 = Enum.at(game.tiles,i)
    |> Map.replace!( :display, true)
    |> Map.replace!( :done, true)

    updatedTiles = List.replace_at(game.tiles,i,tile1)

    tile2 = Enum.at(updatedTiles, game.openTile)
    |> Map.replace!( :done, true)

    updatedTiles = List.replace_at(updatedTiles, game.openTile, tile2)

    Map.replace!(game, :tiles, updatedTiles)
    |> Map.replace!( :clicks, game.clicks+1)
    |> Map.replace!( :matches, game.matches+1)
    |> Map.replace!( :openTile, -1)

  end

  def tileMismatch(game, i) do
    newVal = game.tiles
    |> Enum.at(i)
    |> Map.replace!( :display, false)

    updatedTiles = List.replace_at(game.tiles,i,newVal)

    Map.replace!(game, :tiles, updatedTiles)
    |> Map.replace!( :clicks, game.clicks+1)
    |> Map.replace!( :openTile, -1)
    |> Map.replace!( :clickDisable, false)
  end

  def client_view(game) do
    game
  end

end
