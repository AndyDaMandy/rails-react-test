class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name, null:false
      t.text :ingredients, null:false
      t.text :instruction, null:false
      t.string :image, default: 'https://i.imgur.com/Nww8b1c.jpg'

      t.timestamps
    end
  end
end
