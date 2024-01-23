import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { UploadComponent } from "../components/UploadComponent/UploadComponent";
import { api } from "../api";
import { socket } from "../api";
import { Collage as CollageType } from "../types";

export const Collage = () => {
  const { name } = useParams();

  const [collage, _setCollage] = React.useState<null | CollageType>(null);
  const collageRef = useRef<CollageType | null>(null);
  const setCollage = (collage: CollageType | null) => {
    _setCollage(collage);
    collageRef.current = collage;
  };
  const [users, _setUsers] = React.useState<{ name: string; id: string }[]>([]);
  const usersRef = useRef<{ name: string; id: string }[]>([]);
  const setUsers = (users: { name: string; id: string }[]) => {
    _setUsers(users);
    usersRef.current = users;
  };

  const onLoadImage = (position: number, image: File) => {
    if (collage) {
      api.addImage(position, image, collage?.name).then(() => {
        socket.emit("updateCollage", collage.id);
      });
    }
  };

  const onUpdateImage = (id: string, x: number, y: number) => {
    if (collage) {
      api.updateImage(id, x, y).then(() => {
        socket.emit("updateCollage", collage.id);
      });
    }
  };

  React.useEffect(() => {
    if (name) {
      api.getByName(name).then((collage) => {
        setCollage(collage);

        // джоинимся в комнату
        socket.emit("join", collage.id);

        // подписываемся на сокеты
        socket.on("joined", (users: { name: string; id: string }[] = []) => {
          setUsers([...users]);
        });

        socket.on("left", (users: { name: string; id: string }[] = []) => {
          setUsers([...users]);
        });

        socket.on("updatedCollage", (collage: CollageType) => {
          setCollage(collage);
        });
      });
    }
  }, [name]);

  return (
    <>
      <div className="AppUsers">
        {usersRef.current.map((user) => (
          <div
            className={`AppUser ${socket.id === user.id && "AppUser_me"}`}
            key={user.name}
          >
            <img src={`https://robohash.org/${user.id}`} alt={user.name} />
            {user.name}
          </div>
        ))}
      </div>
      <div className="AppContainer">
        {collage &&
          Array(6)
            .fill(Math.random())
            .map((_, index) => (
              <UploadComponent
                key={index}
                position={index}
                data={collage?.images.find((i) => i.position === index) || null}
                onLoad={onLoadImage}
                onUpdate={onUpdateImage}
              />
            ))}
      </div>
    </>
  );
};
