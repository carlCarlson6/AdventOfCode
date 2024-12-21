use strum::EnumIter;

type Position = (i32,i32);

#[derive(Clone)]
pub struct Letter {
  pub position: Position,
  pub value: char,
}

#[derive(Debug, EnumIter)]
pub enum Directions {
  Up,
  Down,
  Right,
  Left,
  UpRight,
  UpLeft,
  DownRight,
  DownLeft
}

impl Directions {
  pub fn move_in_direction(&self, position: Position, times: i32) -> Position {
    let movement_vector = match self {
      Directions::Up        => (0 * times,  1 * times),
      Directions::Down      => (0 * times,  -1 * times),
      Directions::Right     => (1 * times,  0 * times),
      Directions::Left      => (-1 * times, 0 * times),
      Directions::UpRight   => (1 * times,  1 * times),
      Directions::UpLeft    => (-1 * times,  1 * times),
      Directions::DownRight => (1 * times,  -1 * times),
      Directions::DownLeft  => (-1 * times,  -1 * times),
    };
    (
      movement_vector.0 + position.0,
      movement_vector.1 + position.1
    )
  }
}