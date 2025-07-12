import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Plus, X, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import { getSkillLevelColor, getAvatarFallback } from '../lib/utils';
import type { UpdateProfileData, Skill } from '../types';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileData>();

  const skillsOffered = watch('skillsOffered') || [];
  const skillsWanted = watch('skillsWanted') || [];

  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
      setValue('bio', user.bio);
      setValue('skillsOffered', user.skillsOffered);
      setValue('skillsWanted', user.skillsWanted);
      setValue('availability', user.availability);
      setValue('isPublic', user.isPublic);
      setValue('location', user.location);
    }
  }, [user, setValue]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const newSkill: Skill = {
      name: '',
      level: 'Beginner',
      description: '',
    };

    if (type === 'offered') {
      setValue('skillsOffered', [...skillsOffered, newSkill]);
    } else {
      setValue('skillsWanted', [...skillsWanted, newSkill]);
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', index: number) => {
    if (type === 'offered') {
      setValue('skillsOffered', skillsOffered.filter((_, i) => i !== index));
    } else {
      setValue('skillsWanted', skillsWanted.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: UpdateProfileData) => {
    setIsLoading(true);
    try {
      // Upload photo first if selected
      if (photoFile) {
        await userAPI.uploadPhoto(photoFile);
      }

      // Update profile
      const response = await userAPI.updateProfile(data);
      updateUser(response.user);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              {previewUrl || user.profilePhoto ? (
                <img
                  src={previewUrl || `http://localhost:5000${user.profilePhoto}`}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    {getAvatarFallback(user.fullName)}
                  </span>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.fullName}</h3>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-sm text-gray-500 mt-1">
                Click the camera icon to update your photo
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g., New York, NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                {...register('availability')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Very Active">Very Active</option>
                <option value="Active">Active</option>
                <option value="Casual">Casual</option>
                <option value="Rarely Available">Rarely Available</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                {...register('isPublic')}
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Make profile public
              </label>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              placeholder="Tell us about yourself and your interests..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Skills Offered */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Skills I Can Teach</h3>
              <button
                type="button"
                onClick={() => addSkill('offered')}
                className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </button>
            </div>

            <div className="space-y-4">
              {skillsOffered.map((skill, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    {...register(`skillsOffered.${index}.name` as const, {
                      required: 'Skill name is required',
                    })}
                    placeholder="Skill name"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  
                  <select
                    {...register(`skillsOffered.${index}.level` as const)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <input
                    {...register(`skillsOffered.${index}.description` as const)}
                    placeholder="Brief description"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />

                  <button
                    type="button"
                    onClick={() => removeSkill('offered', index)}
                    className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Skills I Want to Learn</h3>
              <button
                type="button"
                onClick={() => addSkill('wanted')}
                className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </button>
            </div>

            <div className="space-y-4">
              {skillsWanted.map((skill, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    {...register(`skillsWanted.${index}.name` as const, {
                      required: 'Skill name is required',
                    })}
                    placeholder="Skill name"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  
                  <select
                    {...register(`skillsWanted.${index}.level` as const)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <input
                    {...register(`skillsWanted.${index}.description` as const)}
                    placeholder="Brief description"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />

                  <button
                    type="button"
                    onClick={() => removeSkill('wanted', index)}
                    className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="spinner mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
