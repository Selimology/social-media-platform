import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { RiVideoUploadFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import useAuthStore from '../store/auth';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideo(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(false);
    }
  };

  const handlePost = async () => {
    if (caption && topic && video?._id) {
      setSavingPost(true);

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: video._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _ref: userProfile?._id,
          _type: 'postedBy',
        },
        topic: topic,
      };

      await axios.post(`${BASE_URL}/api/posts`, document);
      router.push('/');
    }
  };

  return (
    <div className="flex h-full w-full justify-center   items-center ">
      <div className=" h-fit rounded-lg flex-col gap-4 sm:flex-row sm:gap-10 flex-wrap flex ">
        <div>
          <p className="text-2xl font-bold">Upload</p>
          <p className="text-md text-gray-400 mb-6">
            Post a video to your account
          </p>
          <div className="w-[250px] h-[400px] border-dashed rounded border-4 border-gray-300 items-center flex flex-col justify-center outline-none w- p-10 cursor pointer hover:border-pink-400 hover:bg-gray-100">
            {isLoading ? (
              <div>
                <p className="text-center text-2xl text-red-500 font-bold">
                  Uploading.
                </p>
              </div>
            ) : (
              <div>
                {video ? (
                  <div>
                    <video
                      src={video.url}
                      controls
                      className="bg-black rounded-xl h-[450px] mt-16"
                      loop
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p>
                          <RiVideoUploadFill className="text-gray-400 text-6xl" />
                        </p>
                        <p className="text-sm font-bold mt-2 ">
                          Select video to upload!
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="uploadvideo"
                      className="w-0 h-0"
                      onChange={(e) => uploadVideo(e)}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Please upload a valid video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-10 sm:mt-40">
          <label className="font-bold capitalize"> Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            className=" rounded outline-none text-md border-2 text-black border-gray-300 p-2"
          />
          <label className="font-bold capitalize">Choose topic category</label>
          <select
            className="outline-none border-2 border-gray-300 bg-white text-md capitalize  rounded cursor-pointer p-2"
            onChange={(event) => setTopic(event.target.value)}
          >
            {topics.map((topic) => (
              <option
                className="outline-none capitalize bg-white text-gray-700 text-md px-2 hover:bg-slate-300"
                value={topic.name}
                key={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex justify-between gap-4 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className=" px-6 border-2 border-red-300 py-2 hover:border-red-500 hover:bg-red-500 hover:text-white  text-gray-500 text-md font-bold
              "
            >
              Cancel
            </button>
            <button
              onClick={() => handlePost()}
              type="button"
              className=" px-10 border-2 py-2 bg-black text-white hover:bg-green-500 text-md font-bold "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
